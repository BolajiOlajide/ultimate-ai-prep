const { Reply } = require('./models');

const respond = require('../utils/respond');


exports.createReply = async (req, res) => {
  try {
    const reply = new Reply(req.body);
    await reply.save();

    return respond(res, reply, 200);
  } catch (error) {
    // logging the error message so we can trace logs for use, this should
    // ideally be substituted for an actually logger like winston
    console.log(error.message);
    return respond(res, 'An error occurred while creating this reply.', 400)
  }
};

exports.fetchReply = async (req, res) => {};

exports.deleteReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const existingReply = await Reply.findById(replyId);

    if (existingReply) {
      await Reply.findByIdAndDelete(replyId);
      return respond(res, {}, 204);
    }

    return respond(res, `The reply with ID ${replyId} does not exist.`, 404);
  } catch (error) {
    // logging the error message so we can trace logs for use, this should
    // ideally be substituted for an actually logger like winston
    console.log(error.message);
    return respond(res, 'An error occurred while creating this reply.', 400)
  }
};
