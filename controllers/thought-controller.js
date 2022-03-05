const { User, Thought } = require('../models');

const thoughtController = {
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        )
      })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No user found with this id' })
          return;
        }
        res.json(thoughtData)
      })
      .catch(err => res.json(err));
  },

  getThoughts(req, res) {
    Thought.find()
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.json(err))
  },
  getSingleThought() { },
  updateThought() { },
  deleteThought() { },
  createReaction() { },
  deleteReaction() { }
};

module.exports = thoughtController;