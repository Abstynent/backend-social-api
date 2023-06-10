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
            const user = await User.findOne({ _id: req.params.userId})
            .populate('thoughts')
            .populate('friends');

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            
            console.log(user);
            res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    // function to create user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);

            console.log(`✅ New user with ID ${user._id} created!`);

            res.json(user);
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

            console.log(`✅ User with ID ${req.params.userId} updated!`);
            return res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    // delete user by id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            
            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            const thoughts = await Thought.deleteMany({ userId: user._id })

            console.log(`✅ User successfully deleted with ${thoughts.deletedCount} thought(s).` )
            res.json({ message: `User successfully deleted with ${thoughts.deletedCount} thought(s).` });
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
                return res.status(404).json({ message: 'No user with that ID' });;
            };

            console.log(`✅ Friend connection between user ${req.params.userId} and ${req.params.friendId} successfully created!`)
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
            console.log(`✅ Friend connection successfully removed. User ${req.params.userId} is no longer connected with ${req.params.friendId}.`)
            res.json({ message: `Friend connection successfully removed. User ${req.params.userId} is no longer connected with ${req.params.friendId}.`});
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}