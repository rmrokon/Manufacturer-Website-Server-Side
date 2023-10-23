const graceFullyShutdown = require("../helpers/gracefullyShutdown");
const createServer = require("./express");
const { connectDatabase } = require("./mongoose");

module.exports = (function Loaders() {
  return {
    async load(config) {
      return Promise.all([
        await loadDatabase(config?.mongo_uri),
        await loadExpress(config?.port),
      ]);
    },
  };
})();

async function loadDatabase(uri) {
  try {
    const mongooseConnection = await connectDatabase(uri);
    console.log("📦 Database connected");
    return mongooseConnection;
  } catch (error) {
    console.log("Database connection failed", error);
  }
}

async function loadExpress(port) {
  try {
    const server = await createServer();
    console.log("📦 ExpressJS Loaded...");
    const serverResponse = server.listen(port);
    const SIGNALS = ["SIGINT", "SIGTERM"];
    SIGNALS.forEach((signal) => graceFullyShutdown(signal, server));

    return serverResponse;
  } catch (error) {
    console.log(error, "🌋 ExpressJS failed to load...");
  }
}
