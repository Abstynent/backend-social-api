const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getSingleThought,
    updateSingleThought,
    deleteSingleThought,
} = require('../../controllers/thoughtController.js');

router.route('/')
    .get(getThoughts)
    .post(createThought);

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateSingleThought)
    .delete(deleteSingleThought);

module.exports = router;