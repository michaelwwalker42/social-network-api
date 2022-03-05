const router = require('express').Router()
const {
  createThought,
  getThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
  createReaction
} = require('../../controllers/thought-controller');


// all thoughts
router
  .route('/')
  .get(getThoughts)
  .post(createThought)

// single thought by id
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought)

// reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction)
  .delete()

  module.exports = router