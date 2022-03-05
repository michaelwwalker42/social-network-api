const router = require('express').Router()
const {
  createThought,
  getThoughts,
  getSingleThought
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
  .put()
  .delete()

// reactions
router
  .route('/:thoughtId/reactions')
  .post()
  .delete()

  module.exports = router