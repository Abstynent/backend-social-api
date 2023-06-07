const { User, Thought } = require('../models');

module.exports = {
    // function to get all existing users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    // get single user by ID
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id});

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }

    },
    // function to create user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true },
            );

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            return res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async deleteUser(req, res) {

    },
}