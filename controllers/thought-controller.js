const { User, Thought } = require('../models');

const thoughtController = {

// POST thought
// /api/thoughts
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
// GET thoughts route
// /api/thoughts
  getThoughts(req, res) {
    Thought.find()
      .select('-__v')
      // sort thoughts by newest timestamp
      .sort({ _id: -1 })
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.json(err))
  },
// GET single thought route
//  /api/thoughts/:thoughtId
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
// PUT thought route
//  /api/thoughts/:thoughtId
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
// DELETE thought route
//  /api/thoughts/:thoughtId
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          res.status(404).json({ message: 'No thoughts found with this id' })
          return;
        }
        return User.findOneAndUpdate(
          { username: deletedThought.username },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        )
      })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'User not found' })
          return;
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },

// POST reaction route
//  /api/thoughts/:thoughtId/reactions
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
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
          res.status(404).json({ message: 'No thought found with this id' })
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

// DELETE reaction 
//   /api/thoughts//:thoughtId/reactions/:reactionId
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then(thoughtData => {
        console.log(`THOUGHT DATA: ${thoughtData}`)
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found' })
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = thoughtController;