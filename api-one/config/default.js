require('dotenv').config();
const { getEnvVar } = require('env-utils');


const lazyGetEnvVar = (...args) => () => getEnvVar(...args);

module.exports = {
  app: {
    port: lazyGetEnvVar('PORT', { devDefault: '8100' })
  },

  intent: {
    baseUrl: lazyGetEnvVar('INTENT_API_BASE_URL', { optional: false })
  }
};
