const { User, Thought } = require('../models');

module.exports = {
    // handle route to get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought } },
                { new: true },
            );

            if(!user) {
                return res.status(404).json({ message: "No user with that username "})
            }
            res.json(thought);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
};