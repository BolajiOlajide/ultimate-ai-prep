const Joi = require('@hapi/joi');

exports.getReplySchema = {
  body: Joi.object({
    confidence: Joi.number().required(),
    name: Joi.string().trim().required().lowercase(),
  }).required(),
};

exports.createReplySchema = {
  body: Joi.object({
    intent: Joi.string().trim().required().lowercase(),
    response: Joi.string().trim().required()
  }).required(),
};

exports.deleteReplySchema = {
  params: Joi.object({
    replyId: Joi.number().integer().positive().required(),
  }),
};
