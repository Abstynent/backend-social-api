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

    },
    async deleteUser(req, res) {

    },
}