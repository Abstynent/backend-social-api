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
            const user = await User.findOne({ _id: req.params.userId});

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
    // update user by id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
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
    // delete user by id
    async deleteUser(req, res) {
        try {
            const user = User.findOneAndRemove({ _id: req.params.userId });
            
            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json({ message: 'User successfully deleted' });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    // add user(friend) to current user friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                { new: true }
            );

            if(!user) {
                return res(404).json({ message: 'No user with that ID' });;
            };

            res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    // remove user(friend) from current user friend list
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { new: true },
            );

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            };

            res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}