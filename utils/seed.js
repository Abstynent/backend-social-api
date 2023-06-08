const connection = require('../config/connection');
const { User, Thought } = require('../models/');
const userData = require('./userData.json');

const thoughts = [
    'Decision Trackers are awesome',
    'Find My Phone is a useful app',
    'Learn Piano is not very good for learning Piano',
    'Starbase Defender is a great game, I love it',
    'Tower Defense is okay',
    'Monopoly Money is better than real money IMO',
    'Movie trailers are just the best parts of a movie distilled into 90 seconds',
    'Hello world, this is a comment',
    'Social media is a big waste of time',
    'Notes is my most used app',
    'Messages is open on my computer 24/7',
  ];

console.time('seeding');

connection.once('open', async () => {
    await User.deleteMany();
    await Thought.deleteMany();

    for(let i = 0; i< userData.length; i++) {
        const user = await User.create(userData[i]);
        const thought = await Thought.create({
            thoughtText: thoughts[i],
            username: user.username,
            userId: user._id.toString(),
        });
    };

    console.timeEnd('seeding complete 🌱');
    process.exit(0);
});

