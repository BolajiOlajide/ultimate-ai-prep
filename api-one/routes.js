const fetch = require('node-fetch');
const config = require('lazy-config');
const { nanoid } = require('nanoid');

const respond = require('../utils/respond');


exports.getReply = async (req, res) => {
  try {
    const { message } = req.body;

    const intentUrl = `${config.intent.baseUrl}/intents`;
    const replyUrl = `${config.app.replyServerBaseUrl}/reply`;
    const conversationId = nanoid();

    const response = await fetch(intentUrl, {
      method: 'POST',
      body: JSON.stringify({
        botId: '5f74865056d7bb000fcd39ff',
        message,
        conversationId
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': config.intent.token
      }
    });

    if (!response.ok) {
      return respond(res, 'An error occurred while fetching the intent.', 400);
    }

    const { intents } = await response.json();

    // I am assuming that the first intent is always going to have
    // the highest confidence here.
    const [firstIntent] = intents;

    // always default to greeting in the event that no intent is found
    const intentToSend = firstIntent || {
      confidence: 0.5,
      name: 'Greeting'
    }

    const replyResponse = await fetch(replyUrl, {
      method: 'POST',
      body: JSON.stringify(intentToSend),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!replyResponse.ok) {
      return respond(res, 'An error occurred while fetching the reply.', 400);
    }

    const replyData = await replyResponse.json();

    return respond(res, replyData.data, 200);
  } catch (error) {
    // logging the error message so we can trace logs for use, this should
    // ideally be substituted for an actually logger like winston
    console.log(error);
    return respond(res, 'An error occurred while fetching intent.', 400)
  }
};
