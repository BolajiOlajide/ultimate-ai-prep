const config = require('lazy-config');
const mongoose = require('mongoose');


const DB = {
  connection: null,

  /**
   * Connects to a MongoDB server and subsequently opens a MongoDB connection
   */
  async connect() {
    try {
      mongoose.promise = global.promise;

      await mongoose.connect(config.db.url, {
        poolSize: 10,
        keepAlive: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      });

      console.log('MongoDB is connected');
      DB.connection = mongoose.connection;
    } catch (error) {
      console.log(error.message);
      console.log('MongoDB connection unsuccessful, retry after 10 seconds.');
      setTimeout(() => process.exit(1), 5000);
    }
  },

  /**
   * Closes all connections in the Mongoose connection pool:
   */
  async disconnect() {
    await mongoose.disconnect();
  }
};

module.exports = DB;

