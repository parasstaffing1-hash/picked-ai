import { StructuredAnalysisResult } from '../analysis/response-analyzer';

export interface QuestionObservationRecord {
  questionId: string;
  orderIndex: number;
  question: string;
  engine: 'openai' | 'gemini' | 'google_ai_overview' | 'google_search';
  analysis: StructuredAnalysisResult;
  directUrlCited: boolean;
  rawResponse?: string;
  citations?: Array<{ title?: string; url: string; domain?: string }>;
  status?: 'success' | 'failed' | 'timeout';
  error?: string;
}

export interface CalculatedScores {
  overall_score: number;
  openai_score: number;
  gemini_score: number;
  google_score: number;
  openai_available?: boolean;
  gemini_available?: boolean;
  google_available?: boolean;
  is_partial?: boolean;
  questions_checked: number;
  questions_mentioned: number;
  mention_rate: number; // percentage
  competitor_count: number;
  citation_count: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  methodology: {
    description: string;
    engineWeights: Record<string, string>;
    scoringRules: string[];
  };
}

/**
 * Calculates question score for an individual observation (0 - 100).
 */
export function calculateObservationScore(
  analysis: StructuredAnalysisResult,
  directUrlCited: boolean
): number {
  if (!analysis.businessMentioned) {
    return 0;
  }

  // Base score for presence
  let score = 50;

  // Position bonuses
  if (analysis.position === 1) {
    score += 40; // 90
  } else if (analysis.position === 2) {
    score += 30; // 80
  } else if (analysis.position === 3) {
    score += 20; // 70
  } else if (analysis.position && analysis.position > 3) {
    score += 10; // 60
  } else {
    score += 10;
  }

  // Citation bonus
  if (directUrlCited) {
    score += 10;
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Calculates complete transparent AI visibility scores and metrics.
 */
export function calculateVisibilityScores(
  observations: QuestionObservationRecord[],
  totalQuestionsCount = 10
): CalculatedScores {
  const openaiObs = observations.filter((o) => o.engine === 'openai');
  const geminiObs = observations.filter((o) => o.engine === 'gemini');
  const googleObs = observations.filter(
    (o) => o.engine === 'google_ai_overview' || o.engine === 'google_search'
  );

  // An engine is available if it has observations and not all of them failed
  const openai_available = openaiObs.length > 0 && openaiObs.some((o) => o.status !== 'failed');
  const gemini_available = geminiObs.length > 0 && geminiObs.some((o) => o.status !== 'failed');
  const google_available = googleObs.length > 0 && googleObs.some((o) => o.status !== 'failed');

  const openaiScores: number[] = [];
  const geminiScores: number[] = [];
  const googleScores: number[] = [];

  const uniqueCompetitors = new Set<string>();
  const uniqueSources = new Set<string>();
  const questionsWithMention = new Set<string>();

  for (const obs of observations) {
    const obsScore = calculateObservationScore(obs.analysis, obs.directUrlCited);

    if (obs.engine === 'openai') {
      openaiScores.push(obsScore);
    } else if (obs.engine === 'gemini') {
      geminiScores.push(obsScore);
    } else if (obs.engine === 'google_ai_overview' || obs.engine === 'google_search') {
      googleScores.push(obsScore);
    }

    if (obs.analysis.businessMentioned) {
      questionsWithMention.add(obs.questionId);
    }

    for (const comp of obs.analysis.competitors) {
      if (comp.name) uniqueCompetitors.add(comp.name.toLowerCase().trim());
    }

    for (const src of obs.analysis.sources) {
      if (src.url) uniqueSources.add(src.url);
    }
  }

  const avg = (arr: number[]) => (arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0);

  const openai_score = avg(openaiScores);
  const gemini_score = avg(geminiScores);
  const google_score = avg(googleScores);

  // Dynamic weighting based on active/available engines to support partial scans honestly
  let totalWeight = 0;
  let weightedSum = 0;
  const engineWeights: Record<string, string> = {};

  if (openai_available) {
    const w = 40;
    totalWeight += w;
    weightedSum += openai_score * w;
    engineWeights['ChatGPT (OpenAI)'] = '40% weight (Active)';
  } else if (openaiObs.length > 0) {
    engineWeights['ChatGPT (OpenAI)'] = 'Not Audited / Unavailable';
  }

  if (gemini_available) {
    const w = 40;
    totalWeight += w;
    weightedSum += gemini_score * w;
    engineWeights['Google Gemini'] = '40% weight (Active)';
  } else if (geminiObs.length > 0) {
    engineWeights['Google Gemini'] = 'Not Audited / Unavailable';
  }

  if (google_available) {
    const w = 20;
    totalWeight += w;
    weightedSum += google_score * w;
    engineWeights['Google AI Overviews'] = '20% weight (Active)';
  } else if (googleObs.length > 0) {
    engineWeights['Google AI Overviews'] = 'Not Audited / Unavailable';
  }

  let overall_score = 0;
  if (totalWeight > 0) {
    overall_score = Math.round(weightedSum / totalWeight);
  } else {
    // If no status flags were passed (e.g. legacy/mock tests), fallback to standard formula
    if (googleScores.length > 0) {
      overall_score = Math.round(openai_score * 0.4 + gemini_score * 0.4 + google_score * 0.2);
    } else {
      overall_score = Math.round(openai_score * 0.5 + gemini_score * 0.5);
    }
  }

  overall_score = Math.min(100, Math.max(0, overall_score));

  let grade: CalculatedScores['grade'] = 'F';
  if (overall_score >= 90) grade = 'A+';
  else if (overall_score >= 80) grade = 'A';
  else if (overall_score >= 65) grade = 'B';
  else if (overall_score >= 45) grade = 'C';
  else if (overall_score >= 25) grade = 'D';

  const questions_checked = totalQuestionsCount;
  const questions_mentioned = questionsWithMention.size;
  const mention_rate = questions_checked > 0 ? Math.round((questions_mentioned / questions_checked) * 100) : 0;
  const is_partial = !openai_available || !gemini_available || !google_available;

  return {
    overall_score,
    openai_score,
    gemini_score,
    google_score,
    openai_available,
    gemini_available,
    google_available,
    is_partial,
    questions_checked,
    questions_mentioned,
    mention_rate,
    competitor_count: uniqueCompetitors.size,
    citation_count: uniqueSources.size,
    grade,
    methodology: {
      description:
        'The Picked AI Visibility Score evaluates brand presence, recommendation rank, and source citations across real consumer prompts.',
      engineWeights,
      scoringRules: [
        'Brand Mentioned: Base 50 points',
        'Ranked #1 Position: +40 points (90 total)',
        'Ranked #2 Position: +30 points (80 total)',
        'Ranked #3 Position: +20 points (70 total)',
        'Direct Website Citation / Domain Link: +10 points bonus',
        'Not Mentioned: 0 points',
      ],
    },
  };
}
