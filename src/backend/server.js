'use strict';

// Load environment variables before importing app
require('dotenv').config();

const app = require('./app');
const db = require('./config/db');

const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = process.env.HOST || '0.0.0.0';

// =============================================================================
// Graceful shutdown helper
// Closes the HTTP server, then releases the DB pool before exiting.
// =============================================================================
function shutdown(signal, server) {
  console.log(`\n[server] ${signal} received – shutting down gracefully…`);

  server.close(() => {
    console.log('[server] HTTP server closed.');

    // Release the PostgreSQL connection pool
    db.pool
      .end()
      .then(() => {
        console.log('[server] Database pool closed.');
        process.exit(0);
      })
      .catch((err) => {
        console.error('[server] Error closing database pool:', err.message);
        process.exit(1);
      });
  });

  // Force-kill if graceful shutdown takes longer than 10 seconds
  setTimeout(() => {
    console.error('[server] Forced shutdown after timeout.');
    process.exit(1);
  }, 10_000).unref();
}

// =============================================================================
// Start server
// =============================================================================
const server = app.listen(PORT, HOST, () => {
  console.log('='.repeat(60));
  console.log(' Westbrook Community Library – Reservation API');
  console.log('='.repeat(60));
  console.log(` Environment : ${process.env.NODE_ENV || 'development'}`);
  console.log(` Listening   : http://${HOST}:${PORT}`);
  console.log(` Health      : http://${HOST}:${PORT}/health`);
  console.log('='.repeat(60));

  // Verify database connectivity after the HTTP server is up.
  // A failed connection logs the error but does not crash the process,
  // allowing the health endpoint to remain reachable for diagnostics.
  db.connect().catch((err) => {
    console.error('[server] Database connectivity check failed:', err.message);
  });
});

// =============================================================================
// Unhandled rejection / exception guards
// =============================================================================
process.on('unhandledRejection', (reason) => {
  console.error('[server] Unhandled Promise Rejection:', reason);
  // Do not crash in production; log and continue
});

process.on('uncaughtException', (err) => {
  console.error('[server] Uncaught Exception:', err);
  // Uncaught exceptions leave the process in an undefined state – exit cleanly
  process.exit(1);
});

// Register graceful shutdown signals
process.on('SIGTERM', () => shutdown('SIGTERM', server));
process.on('SIGINT', () => shutdown('SIGINT', server));
