const { User, Thought } = require('../models')

const userController = {
  // GET all users route 
  //  /api/users
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err));
  },
  // POST user route  
  //    /api/users/:userId
  createUser(req, res) {
    User.create(req.body)
      .then(userData => res.json(userData))
      .catch(err => res.json(err));
  },
  // GET user route 
  //   /api/users/:userId  
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
  // PUT user route  
  //   /api/users/:userId
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err));
  },
  //  DELETE user route  
  //  /api/users/:userId
  deleteUser(req, res) {
    User.findOneAndDelete(
      { _id: req.params.userId },
    )
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' })
          return;
        }
        // delete user's thoughts
        Thought.deleteMany({ username: userData.username })
          .then(thoughtData => {
            if (!thoughtData) {
              res.status(404).json({ message: 'Could not delete thoughts from user' })
              return;
            }
          })
        // remove user from associated friends lists
        User.updateMany(
          // The $in operator selects the documents where the value of a field equals any value in the specified array
          { _id: { $in: userData.friends } },
          { $pull: { friends: req.params.userId } }
        )
          .then(userData => {
            if (!userData) {
              res.status(404).json({ message: 'Could not remove user from friends' })
              return;
            }
          })
        res.json({ message: 'User deleted' })
      })
      .catch(err => res.status(400).json(err));
  },
  // POST friend route
  // /api/users/:userId/friends/:friendId
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true, runValidators: true }
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
  // DELETE friend route
  // /api/users/:userId/friends/:friendId
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