const dotenv = require('dotenv').config();

module.exports = {
  compress: true,
  env: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    BASE_API_URL: process.env.BASE_API_URL,
    SECURE_COOKIE: process.env.SECURE_COOKIE,
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_APP_KEY: process.env.ALGOLIA_APP_KEY,
  },
  webpack(config, { webpack, isServer }) {
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }
    const plugins = [...config.plugins];
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins: plugins,
    };
  },
};
