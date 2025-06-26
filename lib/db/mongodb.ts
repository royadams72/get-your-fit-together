/* eslint-disable no-var */
import { MongoClient, Db } from "mongodb";
import { ENV } from "../services/env.service";

declare global {
  var _mongoClient: MongoClient | null;
  var _mongoDb: Db | null;
}

// For TypeScript modules
export {};

let cachedClient = global._mongoClient || null;
let cachedDb = global._mongoDb || null;

export async function connectToDB(): Promise<Db> {
  if (cachedDb) return cachedDb;

  if (!ENV.MONGODB_URI || !ENV.MONGODB_DB_NAME) {
    throw new Error("Missing MongoDB connection environment variables");
  }

  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(ENV.MONGODB_URI);
      await cachedClient.connect();
      global._mongoClient = cachedClient;
    }

    cachedDb = global._mongoDb = cachedClient.db(ENV.MONGODB_DB_NAME);
    return cachedDb;
  } catch (error) {
    // Optionally log or handle the error here
    throw new Error(`Failed to connect to DB: ${error}`);
  }
}
