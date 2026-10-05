import { Pool } from 'pg';
import fs from 'node:fs';
import path from 'node:path';

const rawUrl = process.env.DATABASE_URL;
if (!rawUrl) {
  console.error('[PostgreSQL Migration] Error: DATABASE_URL environment variable is required.');
  process.exit(1);
}
const cleanUrl = rawUrl.replace(/\?.*$/, '');

export async function runMigrations() {
  console.log('[PostgreSQL Migration] Connecting to:', cleanUrl.replace(/:[^:@]+@/, ':****@'));
  const pool = new Pool({
    connectionString: cleanUrl,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    // 1. Core tables schema without Supabase-specific functions
    const schemaSql = `
      -- 1. LEADS TABLE
      CREATE TABLE IF NOT EXISTS public.leads (
          id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          email TEXT NOT NULL UNIQUE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- 2. SCANS TABLE
      CREATE TABLE IF NOT EXISTS public.scans (
          id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          lead_id TEXT REFERENCES public.leads(id) ON DELETE SET NULL,
          url TEXT NOT NULL,
          business_name TEXT,
          industry TEXT,
          city TEXT,
          language TEXT NOT NULL DEFAULT 'en',
          status TEXT NOT NULL DEFAULT 'queued' CHECK (
              status IN (
                  'queued',
                  'crawling',
                  'analyzing',
                  'generating_questions',
                  'checking_ai',
                  'building_report',
                  'completed',
                  'failed'
              )
          ),
          progress INTEGER NOT NULL DEFAULT 0,
          error TEXT,
          started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          completed_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- 3. QUESTIONS TABLE
      CREATE TABLE IF NOT EXISTS public.questions (
          id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          scan_id TEXT NOT NULL REFERENCES public.scans(id) ON DELETE CASCADE,
          question TEXT NOT NULL,
          language TEXT NOT NULL DEFAULT 'en',
          order_index INTEGER NOT NULL DEFAULT 0,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- 4. AI RESPONSES TABLE
      CREATE TABLE IF NOT EXISTS public.ai_responses (
          id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          scan_id TEXT NOT NULL REFERENCES public.scans(id) ON DELETE CASCADE,
          question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
          engine TEXT NOT NULL CHECK (engine IN ('openai', 'gemini', 'google_ai_overview', 'google_search')),
          model TEXT NOT NULL,
          raw_response TEXT,
          response_json JSONB,
          duration_ms INTEGER DEFAULT 0,
          status TEXT NOT NULL DEFAULT 'success' CHECK (status IN ('success', 'failed', 'timeout')),
          error TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- 5. MENTIONS TABLE
      CREATE TABLE IF NOT EXISTS public.mentions (
          id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          ai_response_id TEXT NOT NULL REFERENCES public.ai_responses(id) ON DELETE CASCADE,
          business_mentioned BOOLEAN NOT NULL DEFAULT FALSE,
          position INTEGER,
          confidence NUMERIC(4, 2) DEFAULT 0.90,
          evidence TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- 6. COMPETITORS TABLE
      CREATE TABLE IF NOT EXISTS public.competitors (
          id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          ai_response_id TEXT NOT NULL REFERENCES public.ai_responses(id) ON DELETE CASCADE,
          name TEXT NOT NULL,
          url TEXT,
          position INTEGER,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- 7. SOURCES TABLE
      CREATE TABLE IF NOT EXISTS public.sources (
          id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          ai_response_id TEXT NOT NULL REFERENCES public.ai_responses(id) ON DELETE CASCADE,
          title TEXT,
          url TEXT NOT NULL,
          domain TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- 8. REPORTS TABLE
      CREATE TABLE IF NOT EXISTS public.reports (
          id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          scan_id TEXT NOT NULL UNIQUE REFERENCES public.scans(id) ON DELETE CASCADE,
          overall_score INTEGER NOT NULL DEFAULT 0,
          openai_score INTEGER NOT NULL DEFAULT 0,
          gemini_score INTEGER NOT NULL DEFAULT 0,
          google_score INTEGER NOT NULL DEFAULT 0,
          report_json JSONB NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- INDEXES
      CREATE INDEX IF NOT EXISTS idx_scans_lead_id ON public.scans(lead_id);
      CREATE INDEX IF NOT EXISTS idx_scans_status ON public.scans(status);
      CREATE INDEX IF NOT EXISTS idx_questions_scan_id ON public.questions(scan_id);
      CREATE INDEX IF NOT EXISTS idx_ai_responses_scan_id ON public.ai_responses(scan_id);
      CREATE INDEX IF NOT EXISTS idx_ai_responses_question_id ON public.ai_responses(question_id);
      CREATE INDEX IF NOT EXISTS idx_mentions_ai_response_id ON public.mentions(ai_response_id);
      CREATE INDEX IF NOT EXISTS idx_competitors_ai_response_id ON public.competitors(ai_response_id);
      CREATE INDEX IF NOT EXISTS idx_sources_ai_response_id ON public.sources(ai_response_id);
      CREATE INDEX IF NOT EXISTS idx_reports_scan_id ON public.reports(scan_id);
    `;

    console.log('[PostgreSQL Migration] Applying table schemas and indexes...');
    await pool.query(schemaSql);
    console.log('✅ [PostgreSQL Migration] All 8 tables and indexes created successfully!');

    // Verify tables
    const res = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log('Active PostgreSQL Tables in database:');
    res.rows.forEach((r) => console.log(' - public.' + r.table_name));
  } catch (err) {
    console.error('❌ [PostgreSQL Migration] Failed:', err);
    throw err;
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  runMigrations()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
