const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        _id: false,
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true, 
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (timestamp) => {
                return new Date(timestamp).toLocaleDateString(); // Format the timestamp as a date string
              }
        },
    }
);

module.exports = reactionSchema;