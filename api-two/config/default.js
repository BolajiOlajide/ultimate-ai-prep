require('dotenv').config({ path: '../.env' });
const { getEnvVar } = require('env-utils');


const lazyGetEnvVar = (...args) => () => getEnvVar(...args);

module.exports = {
  app: {
    port: lazyGetEnvVar('API_TWO_PORT', { devDefault: '8000' })
  },

  db: {
    url: lazyGetEnvVar('MONGO_DB_URL', { optional: false })
  }
};
