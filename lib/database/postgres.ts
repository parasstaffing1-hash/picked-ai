import { Pool, QueryResult, QueryResultRow } from 'pg';

let poolInstance: Pool | null = null;

/**
 * Returns an initialized PostgreSQL Pool client if DATABASE_URL is set.
 * Automatically handles SSL configuration for cloud databases (like Aiven).
 */
export function getPostgresPool(): Pool | null {
  if (poolInstance) return poolInstance;

  const rawUrl = process.env.DATABASE_URL;
  if (!rawUrl) return null;

  try {
    // Strip query parameters (e.g. ?sslmode=require) so pg uses explicit SSL options without self-signed cert rejection
    const cleanUrl = rawUrl.replace(/\?.*$/, '');
    poolInstance = new Pool({
      connectionString: cleanUrl,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    poolInstance.on('error', (err) => {
      console.warn('[PostgreSQL Pool] Unexpected error on idle client:', err);
    });

    return poolInstance;
  } catch (err) {
    console.warn('[PostgreSQL] Failed to initialize pool:', err);
    return null;
  }
}

/**
 * Executes a parameterized SQL query with automatic error handling.
 */
export async function pgQuery<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T> | null> {
  const pool = getPostgresPool();
  if (!pool) return null;

  try {
    return await pool.query<T>(text, params);
  } catch (err) {
    console.warn('[PostgreSQL Query Error]:', err);
    return null;
  }
}
