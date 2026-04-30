'use strict';

const { Pool } = require('pg');

// =============================================================================
// PostgreSQL Connection Pool
// All parameters are read from environment variables so that no credentials
// are ever hard-coded.  See .env.example for the full variable list.
// =============================================================================

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME     || 'westbrook_library',
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  // Pool sizing
  max:              parseInt(process.env.DB_POOL_MAX              || '10',    10),
  min:              parseInt(process.env.DB_POOL_MIN              || '2',     10),
  idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT_MS || '30000', 10),

  // Time to wait for a connection before throwing (ms)
  connectionTimeoutMillis: 5000,

  // Keep SSL flexible: set DB_SSL=true in production environments
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

// =============================================================================
// Pool-level error listener
// "error" events on idle clients must be handled here to prevent
// an unhandled exception from crashing the process.
// =============================================================================
pool.on('error', (err) => {
  console.error('[db] Unexpected error on idle client:', err.message);
  // Do NOT call process.exit here – let the application decide how to recover.
});

// =============================================================================
// connect()
// Verifies the pool can reach the database at startup.
// Call this once from server.js after the HTTP server is listening.
// =============================================================================
async function connect() {
  let client;
  try {
    client = await pool.connect();
    const { rows } = await client.query('SELECT current_database() AS db, NOW() AS ts');
    console.log(
      `[db] Connected to PostgreSQL – database: "${rows[0].db}", server time: ${rows[0].ts}`
    );
  } catch (err) {
    console.error('[db] Failed to connect to PostgreSQL:', err.message);
    throw err; // Bubble up so server.js can decide to abort startup
  } finally {
    if (client) client.release();
  }
}

// =============================================================================
// query(text, params)
// Thin wrapper around pool.query that adds:
//   • Execution-time logging in development
//   • Consistent error logging before re-throwing
//
// Usage:
//   const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
// =============================================================================
async function query(text, params) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;

    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `[db] query executed in ${duration}ms | rows: ${result.rowCount} | ${text.slice(0, 80)}`
      );
    }

    return result;
  } catch (err) {
    console.error('[db] Query error:', {
      message: err.message,
      query:   text.slice(0, 200),
      params,
    });
    throw err;
  }
}

// =============================================================================
// getClient()
// Returns a raw pool client for use in multi-statement transactions.
// The caller is responsible for calling client.release() in a finally block.
//
// Usage:
//   const client = await db.getClient();
//   try {
//     await client.query('BEGIN');
//     await client.query('INSERT INTO …');
//     await client.query('COMMIT');
//   } catch (err) {
//     await client.query('ROLLBACK');
//     throw err;
//   } finally {
//     client.release();
//   }
// =============================================================================
async function getClient() {
  const client = await pool.connect();

  // Wrap release to log long-running transactions in development
  const originalRelease = client.release.bind(client);
  const checkoutTime = Date.now();

  client.release = () => {
    const duration = Date.now() - checkoutTime;
    if (process.env.NODE_ENV !== 'production' && duration > 5000) {
      console.warn(`[db] Client held for ${duration}ms – possible connection leak?`);
    }
    return originalRelease();
  };

  return client;
}

// =============================================================================
// Exports
// =============================================================================
module.exports = {
  pool,     // Exposed for graceful shutdown in server.js (pool.end())
  connect,  // Startup connectivity check
  query,    // Standard parameterised query helper
  getClient, // Transaction-aware client checkout
};
