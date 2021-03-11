const wretch = require('wretch');
const config = require('lazy-config');
const nanoid = require('nanoid');

const respond = require('../utils/respond');


exports.getIntentRouter = (req, res) => {
  try {
    const intentUrl = `${config.intent.baseUrl}/intents`;
    const conversationId = nanoid();

    const response = await wretch(intentUrl)
      .post({
        botId: '5f74865056d7bb000fcd39ff',
        message,
        conversationId
      })
      .json();
  } catch (error) {
    // logging the error message so we can trace logs for use, this should
    // ideally be substituted for an actually logger like winston
    console.log(error.message);
    return respond(res, 'An error occurred while fetching intent.', 400)
  }
};
