require('dotenv').config({ path: '../.env' });
const { getEnvVar } = require('env-utils');


const lazyGetEnvVar = (...args) => () => getEnvVar(...args);

module.exports = {
  app: {
    port: lazyGetEnvVar('API_ONE_PORT', { devDefault: '8100' })
  },

  intent: {
    baseUrl: lazyGetEnvVar('INTENT_API_BASE_URL', { optional: false }),
    token: lazyGetEnvVar('INTENT_API_TOKEN', { optional: false })
  }
};
