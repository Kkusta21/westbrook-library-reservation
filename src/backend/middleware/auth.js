'use strict';

const jwt = require('jsonwebtoken');

// =============================================================================
// Authentication Middleware
// Verifies the JWT present in the Authorization header, extracts the payload,
// and attaches a normalised `req.user` object for downstream handlers.
//
// Header format expected:
//   Authorization: Bearer <token>
// =============================================================================

/**
 * requireAuth
 * -----------
 * Rejects requests that carry no token or an invalid / expired token.
 * On success, attaches to req.user:
 *   { id, email, name, roleId, roleName }
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'Authentication required. Provide a Bearer token.',
    });
  }

  const token = authHeader.slice(7); // strip "Bearer "

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Attach only what downstream handlers need – never the raw payload
    req.user = {
  id:       payload.id || payload.sub,
  email:    payload.email,
  name:     payload.name,
  roleId:   payload.roleId,
  roleName: payload.roleName || payload.role,

    };
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token has expired. Please log in again.',
      });
    }
    // JsonWebTokenError, NotBeforeError, etc.
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token.',
    });
  }
}

// =============================================================================
// Role-Based Access Control Factory
// Returns a middleware that allows only users whose roleName is in the
// provided list.  Must be placed AFTER requireAuth in the chain.
//
// Usage:
//   router.delete('/users/:id', requireAuth, requireRole('Administrator'), handler);
//   router.post('/reservations', requireAuth, requireRole('Administrator', 'Staff'), handler);
// =============================================================================

/**
 * requireRole(...roles)
 * ---------------------
 * @param  {...string} roles  One or more role names that are permitted.
 * @returns Express middleware
 */
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      // Guard: requireAuth should always run first
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required.',
      });
    }

    if (!roles.includes(req.user.roleName) && !roles.includes(req.user.role))  {
      return res.status(403).json({
        status: 'error',
        message: `Access denied. Required role: ${roles.join(' or ')}.`,
      });
    }

    return next();
  };
}

module.exports = { requireAuth, requireRole };
