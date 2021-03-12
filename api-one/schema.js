const Joi = require('@hapi/joi');

exports.getReplySchema = {
  body: Joi.object({
    message: Joi.string().trim().required(),
  }).required(),
};
