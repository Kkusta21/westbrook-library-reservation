'use strict';

const express = require('express');
const cors = require('cors');

// Load environment variables (must be first so all modules see them)
require('dotenv').config();

const app = express();

// =============================================================================
// CORS
// Allowed origins are read from CORS_ALLOWED_ORIGINS (comma-separated).
// =============================================================================
const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin '${origin}' is not allowed`));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// =============================================================================
// Body Parsers
// =============================================================================
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

// =============================================================================
// Health Check
// A lightweight endpoint for uptime monitoring / load-balancer probes.
// =============================================================================
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// =============================================================================
// API Routes
// =============================================================================
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/resources', require('./routes/resource.routes'));
app.use('/api/reports', require('./routes/report.routes'));
app.use('/api/reservations', require('./routes/reservation.routes'));
app.use('/api/availability', require('./routes/availability.routes'));

// Placeholders – to be wired in subsequent iterations
// app.use('/api/locations', require('./routes/locationRoutes'));

// =============================================================================
// 404 Handler
// Catches any request that did not match a registered route.
// =============================================================================
app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// =============================================================================
// Global Error Handler
// Express identifies this as an error handler because it accepts 4 arguments.
// =============================================================================
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  // CORS errors surface here
  if (err.message && err.message.startsWith('CORS:')) {
    return res.status(403).json({ error: err.message });
  }

  const statusCode = err.statusCode || err.status || 500;
  const message =
    process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Internal Server Error'
      : err.message || 'Internal Server Error';

  if (statusCode >= 500) {
    console.error('[ERROR]', err);
  }

  res.status(statusCode).json({ error: message });
});

module.exports = app;
