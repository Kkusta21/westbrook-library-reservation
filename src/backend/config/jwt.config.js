const jwtConfig = {
  secret: process.env.JWT_SECRET || 'supersecretkey',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  algorithm: 'HS256',
};

module.exports = jwtConfig;
