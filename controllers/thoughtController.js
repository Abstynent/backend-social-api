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
    // func to handle post route to create thought
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
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne(
                { _id: req.params.thoughtId }
            );

            if(!thought) {
                res.status(404).json({ message: "No thought with that ID "});
            };

            res.json(thought);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async updateSingleThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                { new: true },
            );

            if(!thought) {
                res.status(404).json({ message: "No thought with that ID "});
            };

            res.json(thought);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async deleteSingleThought(req, res) {

    },
};