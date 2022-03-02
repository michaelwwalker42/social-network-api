const { Schema, model, Types } = require('mongoose');
// use dayjs for date format
const dayjs = require('dayjs');
const now = (dayjs().format('h:mm a MMM DD, YYYY'));

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: True
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: now
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  },
);

module.exports = ReactionSchema;