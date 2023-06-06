const router = require('express').Router();
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController.js');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;