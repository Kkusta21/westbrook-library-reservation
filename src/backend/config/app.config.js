const appConfig = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  cors: {
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',')
      : ['http://localhost:5173'],
    credentials: true,
  },
};

module.exports = appConfig;
