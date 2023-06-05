const { Schema, model, default: mongoose } = require('mongoose');
import { isEmail } from 'validator';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            uniqure: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [isEmail, 'Invalid email'],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }]

    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;