const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getSingleThought,
    updateSingleThought,
    deleteSingleThought,
    addReactionToThought,
    deleteReactionFromThought,
} = require('../../controllers/thoughtController.js');

router.route('/')
    .get(getThoughts)
    .post(createThought);

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateSingleThought)
    .delete(deleteSingleThought);

router.route('/:thoughtId/reactions')
    .post(addReactionToThought);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReactionFromThought);

module.exports = router;