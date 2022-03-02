const { Schema, model, Types } = require('mongoose');
const ReactionSchema = require('./Reaction');
// use dayjs for date format
const dayjs = require('dayjs');
const now = (dayjs().format('h:mm a MMM DD, YYYY'));

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: now
    },
    username: {
      type: String,
      required: true
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', UserSchema);

module.exports = Thought;