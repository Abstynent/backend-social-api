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
    // get single thought by ID
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
    // update single thought by ID
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
    // delete single thought by ID
    async deleteSingleThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(
                { _id: req.params.thoughtId }
                );

            if(!thought) {
                res.status(404).json({ message: "No thought with that ID "});
            };

            const user = await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true},
            );

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json({ message: "Thought successfully deleted!" });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    // add reaction to Thought by ID
    // /api/thoughts/:thoughtId/reactions - POST
    async addReactionToThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { new: true},
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
    // delete reaction from Thought by ID
    // /api/thoughts/:thoughtId/reactions - DELETE
    async deleteReactionFromThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId }}},
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
};