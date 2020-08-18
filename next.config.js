// require('dotenv').config();

module.exports = {
  env: {
    dbUser: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/generate-sitemap');
    }

    return config;
  },
};
