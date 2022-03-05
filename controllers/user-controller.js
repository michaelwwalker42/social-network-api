const { User } = require('../models')

const userController = {
  createUser(req, res) {
    User.create(req.body)
      .then(userData => res.json(userData))
      .catch(err => res.json(err));
  },
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err));
  },
  getSingleUser(req, res) {
    User.findOne(
      { _id: req.params.userId }
    )
      .select('-__v')
      .populate(
        {
          path: 'thoughts',
          select: '-__v'
        }
      )
      .populate(
        {
          path: 'friends',
          select: '-__v'
        }
      )
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' })
          return;
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete(
      { _id: req.params.userId },
    )
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' })
          return;
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' })
          return;
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' })
          return;
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = userController;