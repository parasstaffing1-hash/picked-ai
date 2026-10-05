import { GoogleGenAI } from '@google/genai';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { extractCitationsFromText } from './providers';
import { isDemoModeEnabled, getMockAIResponse } from '../demo/mock-provider';

export interface EngineObservation {
  engine: 'openai' | 'gemini' | 'google_ai_overview' | 'google_search';
  model: string;
  rawResponse: string;
  citations: Array<{ title?: string; url: string; domain: string }>;
  durationMs: number;
  status: 'success' | 'failed' | 'timeout';
  error?: string;
  isDemo?: boolean;
}

/**
 * Executes an async function with timeout and exponential backoff retry.
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 2,
  baseDelayMs = 800,
  timeoutMs = 12000
): Promise<T> {
  let attempt = 0;
  while (true) {
    attempt++;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const result = await Promise.race([
        fn(),
        new Promise<never>((_, reject) => {
          controller.signal.addEventListener('abort', () => reject(new Error('Request timed out.')));
        }),
      ]);
      clearTimeout(timeout);
      return result;
    } catch (err: any) {
      clearTimeout(timeout);
      if (attempt > retries) {
        throw err;
      }
      const delay = baseDelayMs * Math.pow(1.5, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

/**
 * 1. OpenAI Engine (using Vercel AI SDK).
 */
export async function executeOpenAICheck(
  question: string,
  businessName: string
): Promise<EngineObservation> {
  const start = Date.now();

  // Check Demo Mode
  if (isDemoModeEnabled()) {
    const mock = getMockAIResponse('openai', question, businessName);
    return {
      engine: 'openai',
      model: 'gpt-4o-mini (demo)',
      rawResponse: mock.text,
      citations: mock.citations,
      durationMs: 400,
      status: 'success',
      isDemo: true,
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const modelName = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  if (!apiKey) {
    return {
      engine: 'openai',
      model: modelName,
      rawResponse: '',
      citations: [],
      durationMs: Date.now() - start,
      status: 'failed',
      error: 'OPENAI_API_KEY is not configured in environment variables.',
    };
  }

  try {
    const result = await withRetry(async () => {
      return await generateText({
        model: openai(modelName),
        prompt: question,
        system:
          'You are an authoritative consumer advisor. Provide direct, objective recommendations of real companies and service providers that excel in the user query domain. Cite web domains and names clearly.',
      });
    });

    const text = result.text;
    const citations = extractCitationsFromText(text);

    return {
      engine: 'openai',
      model: modelName,
      rawResponse: text,
      citations,
      durationMs: Date.now() - start,
      status: 'success',
    };
  } catch (err: any) {
    console.error(`[OpenAI Check Error] for question "${question.slice(0, 30)}...":`, err.message);
    return {
      engine: 'openai',
      model: modelName,
      rawResponse: '',
      citations: [],
      durationMs: Date.now() - start,
      status: err.message?.includes('timed out') ? 'timeout' : 'failed',
      error: err.message || 'OpenAI API query error',
    };
  }
}

/**
 * 2. Gemini Engine (using Google GenAI with Search Grounding).
 */
export async function executeGeminiCheck(
  question: string,
  businessName: string
): Promise<EngineObservation> {
  const start = Date.now();

  // Check Demo Mode
  if (isDemoModeEnabled()) {
    const mock = getMockAIResponse('gemini', question, businessName);
    return {
      engine: 'gemini',
      model: 'gemini-3.8-flash (demo)',
      rawResponse: mock.text,
      citations: mock.citations,
      durationMs: 350,
      status: 'success',
      isDemo: true,
    };
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

  if (!apiKey) {
    return {
      engine: 'gemini',
      model: modelName,
      rawResponse: '',
      citations: [],
      durationMs: Date.now() - start,
      status: 'failed',
      error: 'GEMINI_API_KEY not configured.',
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const result = await withRetry(async () => {
      return await ai.models.generateContent({
        model: modelName,
        contents: question,
        config: {
          systemInstruction:
            'You are a helpful AI assistant answering customer buyer queries. Name reputable businesses, agencies, and providers clearly, with strengths and web references.',
        },
      });
    });

    const text = result.text || '';
    const citations = extractCitationsFromText(text);

    // Extract grounding citations if present
    const candidates = result.candidates;
    if (candidates && candidates[0]?.groundingMetadata?.groundingChunks) {
      for (const chunk of candidates[0].groundingMetadata.groundingChunks) {
        const web = chunk.web;
        if (web && web.uri) {
          const url = web.uri;
          try {
            const domain = new URL(url).hostname.replace(/^www\./, '');
            if (!citations.some((c) => c.url === url)) {
              citations.push({
                title: web.title || domain,
                url,
                domain,
              });
            }
          } catch {
            // Ignore parse errors
          }
        }
      }
    }

    return {
      engine: 'gemini',
      model: modelName,
      rawResponse: text,
      citations,
      durationMs: Date.now() - start,
      status: 'success',
    };
  } catch (err: any) {
    console.error(`[Gemini Check Error] for question "${question.slice(0, 30)}...":`, err.message);
    return {
      engine: 'gemini',
      model: modelName,
      rawResponse: '',
      citations: [],
      durationMs: Date.now() - start,
      status: err.message?.includes('timed out') ? 'timeout' : 'failed',
      error: err.message || 'Gemini API query error',
    };
  }
}

/**
 * 3. Legitimate Google AI Overview Interface.
 * Checks visibility in Google AI Overviews using:
 * - Option A: SerpApi live Google AI Overview extraction (SERPAPI_API_KEY)
 * - Option B: Serper live Google Search & AI Overview (SERPER_API_KEY)
 * - Option C: Official Google GenAI Search Grounding (GEMINI_API_KEY / GOOGLE_AI_OVERVIEW_API_KEY)
 * - Option D: Google Custom Search JSON API (GOOGLE_SEARCH_API_KEY + GOOGLE_CUSTOM_SEARCH_CX)
 */
export async function executeGoogleAIOverviewCheck(
  question: string,
  targetDomain: string,
  businessName: string
): Promise<EngineObservation> {
  const start = Date.now();

  // Check Demo Mode
  if (isDemoModeEnabled()) {
    const mock = getMockAIResponse('google_ai_overview', question, businessName);
    return {
      engine: 'google_ai_overview',
      model: 'Google AI Overview (demo)',
      rawResponse: mock.text,
      citations: mock.citations,
      durationMs: 300,
      status: 'success',
      isDemo: true,
    };
  }

  // Option A: SerpApi Live Google AI Overview Extraction
  const serpApiKey = process.env.SERPAPI_API_KEY;
  if (serpApiKey) {
    try {
      const endpoint = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(
        question
      )}&api_key=${serpApiKey}`;
      const res = await withRetry(async () => {
        const r = await fetch(endpoint);
        if (!r.ok) throw new Error(`SerpApi responded with HTTP ${r.status}`);
        return await r.json();
      });

      const aiOverview = res.ai_overview;
      const citations: Array<{ title?: string; url: string; domain: string }> = [];

      if (aiOverview) {
        let text = '';
        if (Array.isArray(aiOverview.text_blocks)) {
          text = aiOverview.text_blocks.map((b: any) => b.snippet || b.text || '').join('\n');
        } else if (typeof aiOverview.snippet === 'string') {
          text = aiOverview.snippet;
        } else if (typeof aiOverview.text === 'string') {
          text = aiOverview.text;
        }

        const refs = aiOverview.references || aiOverview.sources || [];
        for (const ref of refs) {
          const url = ref.link || ref.url;
          if (url) {
            try {
              const domain = new URL(url).hostname.replace(/^www\./, '');
              citations.push({
                title: ref.title || ref.source || domain,
                url,
                domain,
              });
            } catch {}
          }
        }

        // Also check if text has embedded URLs
        const textCitations = extractCitationsFromText(text);
        for (const tc of textCitations) {
          if (!citations.some((c) => c.url === tc.url)) {
            citations.push(tc);
          }
        }

        return {
          engine: 'google_ai_overview',
          model: 'Google AI Overview (Live SerpApi)',
          rawResponse: text || 'Google AI Overview present with cited references.',
          citations,
          durationMs: Date.now() - start,
          status: 'success',
        };
      } else {
        // If Google did not trigger an AI Overview for this specific prompt, extract organic results
        const organic = res.organic_results || [];
        for (const item of organic) {
          const url = item.link;
          if (url) {
            try {
              const domain = new URL(url).hostname.replace(/^www\./, '');
              citations.push({ title: item.title || domain, url, domain });
            } catch {}
          }
        }

        const isRanked = citations.some((c) => c.domain.toLowerCase().includes(targetDomain.toLowerCase()));
        const text = isRanked
          ? `No Google AI Overview triggered for this query. Found in Google organic results: ${targetDomain}.`
          : `No Google AI Overview triggered for this query. Top ranking organic domains: ${citations
              .slice(0, 3)
              .map((c) => c.domain)
              .join(', ')}.`;

        return {
          engine: 'google_ai_overview',
          model: 'Google AI Overview / SERP (SerpApi)',
          rawResponse: text,
          citations,
          durationMs: Date.now() - start,
          status: 'success',
        };
      }
    } catch (err: any) {
      console.warn('[SerpApi Google AI Overview Error]:', err.message);
    }
  }

  // Option B: Google Serper Live Search / AI Overview
  const serperKey = process.env.SERPER_API_KEY;
  if (serperKey) {
    try {
      const res = await withRetry(async () => {
        const r = await fetch('https://google.serper.dev/search', {
          method: 'POST',
          headers: {
            'X-API-KEY': serperKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ q: question }),
        });
        if (!r.ok) throw new Error(`Serper API responded with HTTP ${r.status}`);
        return await r.json();
      });

      const citations: Array<{ title?: string; url: string; domain: string }> = [];
      let text = '';

      if (res.aiOverview) {
        text = typeof res.aiOverview === 'string' ? res.aiOverview : JSON.stringify(res.aiOverview);
      } else if (res.answerBox?.snippet) {
        text = res.answerBox.snippet;
      }

      const organic = res.organic || [];
      for (const item of organic) {
        if (item.link) {
          try {
            const domain = new URL(item.link).hostname.replace(/^www\./, '');
            citations.push({ title: item.title || domain, url: item.link, domain });
          } catch {}
        }
      }

      if (!text) {
        text = `Search results for "${question}". Top results: ${citations
          .slice(0, 3)
          .map((c) => c.title || c.domain)
          .join(', ')}`;
      }

      return {
        engine: 'google_ai_overview',
        model: 'Google AI Overview (Serper)',
        rawResponse: text,
        citations,
        durationMs: Date.now() - start,
        status: 'success',
      };
    } catch (err: any) {
      console.warn('[Serper API Error]:', err.message);
    }
  }

  // Option C: Google GenAI with Search Grounding (Official Google AI Overviews engine)
  const geminiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GOOGLE_AI_OVERVIEW_API_KEY;
  if (geminiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const res = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
        contents: `You are Google AI Overviews generating the official AI search overview for: "${question}". Synthesize the top reputable companies, service providers, or solutions. Explicitly cite web domains and sources. If relevant, mention whether "${businessName}" (${targetDomain}) is recommended.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = res.text || '';
      const citations = extractCitationsFromText(text);

      const groundingChunks = res.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      for (const chunk of groundingChunks) {
        const web = chunk.web;
        if (web && web.uri) {
          const uri = web.uri;
          try {
            const domain = new URL(uri).hostname.replace(/^www\./, '');
            if (!citations.some((c) => c.url === uri)) {
              citations.push({ title: web.title || domain, url: uri, domain });
            }
          } catch {}
        }
      }

      return {
        engine: 'google_ai_overview',
        model: 'Google AI Overview (Gemini Grounded)',
        rawResponse: text,
        citations,
        durationMs: Date.now() - start,
        status: 'success',
      };
    } catch (err: any) {
      console.warn('[Google Search Grounding Error]:', err.message);
    }
  }

  // Option D: Google Custom Search JSON API fallback
  const customKey = process.env.GOOGLE_SEARCH_API_KEY || process.env.GOOGLE_CUSTOM_SEARCH_API_KEY;
  const cx = process.env.GOOGLE_CUSTOM_SEARCH_CX;
  if (customKey && cx) {
    try {
      const endpoint = `https://www.googleapis.com/customsearch/v1?key=${customKey}&cx=${cx}&q=${encodeURIComponent(
        question
      )}&num=10`;
      const res = await withRetry(async () => {
        const r = await fetch(endpoint);
        if (!r.ok) throw new Error(`Google Search API responded with ${r.status}`);
        return await r.json();
      });

      const items = res.items || [];
      const citations = items.map((item: any) => ({
        title: item.title,
        url: item.link,
        domain: new URL(item.link).hostname.replace(/^www\./, ''),
      }));

      const isRanked = citations.some((c: any) => c.domain.includes(targetDomain));
      const text = isRanked
        ? `Found in Google top search results for query "${question}". Indexed URLs: ${citations
            .filter((c: any) => c.domain.includes(targetDomain))
            .map((c: any) => c.url)
            .join(', ')}`
        : `Not found among top 10 organic Google Search results for query "${question}". Top ranking sources: ${citations
            .slice(0, 3)
            .map((c: any) => c.domain)
            .join(', ')}.`;

      return {
        engine: 'google_ai_overview',
        model: 'Google Custom Search API',
        rawResponse: text,
        citations,
        durationMs: Date.now() - start,
        status: 'success',
      };
    } catch (err: any) {
      console.warn('[Google Search API Error]:', err.message);
    }
  }

  return {
    engine: 'google_ai_overview',
    model: 'Google AI Overviews',
    rawResponse: '',
    citations: [],
    durationMs: Date.now() - start,
    status: 'failed',
    error: 'Google AI Overviews credentials (SERPAPI_API_KEY, SERPER_API_KEY, or GEMINI_API_KEY with Search Grounding) are not configured in environment.',
  };
}

/**
 * Backward compatibility alias for Google Search check.
 */
export const executeGoogleSearchCheck = executeGoogleAIOverviewCheck;

