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
      .select('-__v')
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.json(err))
  },

  getSingleThought(req, res) {
    Thought.findOne(
      { _id: req.params.thoughtId }
    )
      .select('-__v')
      .populate(
        {
          path: 'reactions',
          select: '-__v'
        }
      )
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thoughts found with this id' })
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thoughts found with this id' })
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(400).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          res.status(404).json({ message: 'No thoughts found with this id' })
          return;
        }
        res.json(deletedThought);
      })
      .catch(err => res.status(400).json(err));
  },
  createReaction() { },
  deleteReaction() { }
};

module.exports = thoughtController;