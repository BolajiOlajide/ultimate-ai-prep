const { Schema, model } = require('mongoose');


const ReplySchema = new Schema(
  {
    intent: {
      type: Schema.Types.String,
      unique: true,
      required: true,
      trim: true
    },
    response: {
      type: Schema.Types.String,
      required: true,
      trim: true
    }
  },
  { timestamps: true },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  },
);

module.exports.Reply = model('replies', ReplySchema);
