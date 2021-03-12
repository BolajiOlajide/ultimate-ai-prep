const db = require('./db');

const { Reply } = require('./models');


const seedReplies = async () => {
  try {
    await db.connect();

    await Reply.collection.insertMany([
      {
        intent: "greeting",
        response: "Hello, how are you doing today?",
        createdAt: new Date(),
        updatedAt: new Date(),
        "__v": 0
      },
      {
        intent: "thank you",
        response: "You're welcome.",
        createdAt: new Date(),
        updatedAt: new Date(),
        "__v": 0
      },
      {
        intent: "insult",
        response: "I'm sorry if I offended you. That isn't my intention.",
        createdAt: new Date(),
        updatedAt: new Date(),
        "__v": 0
      },
      {
        intent: "how are you doing?",
        response: "I'm doing okay. How about you?",
        createdAt: new Date(),
        updatedAt: new Date(),
        "__v": 0
      },
      {
        intent: "what can i ask you?",
        response: "I can help with anything relating to Ultimate AI. Feel free to ask me any question.",
        createdAt: new Date(),
        updatedAt: new Date(),
        "__v": 0
      },
      {
        intent: "goodbye",
        response: "It was nice conversing with you. Talk later.",
        createdAt: new Date(),
        updatedAt: new Date(),
        "__v": 0
      },
      {
        intent: "returning order",
        response: "Kindly respond with your order number so I can process a refund for you.",
        createdAt: new Date(),
        updatedAt: new Date(),
        "__v": 0
      }
    ], { ordered: false });
    console.log('Successfully seeded!')
  } catch (error) {
    console.log(`An error occured while seeding.\n${error.message}`);
  } finally {
    process.exit(0);
  }
};

seedReplies();
