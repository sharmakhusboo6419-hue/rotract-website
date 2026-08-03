const mongoose = require('mongoose');

const globalState = globalThis.__rotractMongooseState || (globalThis.__rotractMongooseState = {
  conn: null,
  promise: null,
});

async function connectToDatabase() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    return null;
  }

  if (globalState.conn) {
    return globalState.conn;
  }

  if (!globalState.promise) {
    globalState.promise = mongoose
      .connect(uri, {
        // Prevent Vercel serverless functions from timing out on unreachable DB hosts.
        serverSelectionTimeoutMS: 4000,
        connectTimeoutMS: 4000,
      })
      .then(() => mongoose.connection);
  }

  try {
    globalState.conn = await globalState.promise;
    return globalState.conn;
  } catch (error) {
    globalState.promise = null;
    throw error;
  }
}

module.exports = { connectToDatabase };