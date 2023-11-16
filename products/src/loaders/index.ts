import graceFullyShutdown from "../helpers/gracefullyShutdown";
import createServer from "./express";
import { connectDatabase } from "./mongoose";

export = (function Loaders() {
  return {
    async load(config: {mongo_uri: string, port:number}) {
      return Promise.all([
        await loadDatabase(config?.mongo_uri),
        await loadExpress(config?.port),
      ]);
    },
  };
})();

async function loadDatabase(uri: string) {
  try {
    const mongooseConnection = await connectDatabase(uri);
    console.log("📦 Database connected");
    return mongooseConnection;
  } catch (error) {
    console.log("Database connection failed", error);
  }
}

async function loadExpress(port: number) {
  try {
    const server = await createServer();
    console.log("📦 ExpressJS Loaded...");
    const serverResponse = server.listen(port);
    const SIGNALS = ["SIGINT", "SIGTERM"];
    SIGNALS.forEach((signal) => graceFullyShutdown(signal, serverResponse));

    return serverResponse;
  } catch (error) {
    console.log(error, "🌋 ExpressJS failed to load...");
  }
}
