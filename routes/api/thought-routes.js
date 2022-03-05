const router = require('express').Router()
const {
  createThought,
  getThoughts,
  getSingleThought,
  updateThought
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
  .delete()

// reactions
router
  .route('/:thoughtId/reactions')
  .post()
  .delete()

  module.exports = router