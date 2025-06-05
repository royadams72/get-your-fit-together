import { MongoClient, Db } from "mongodb";
import { ENV } from "../services/envService";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDB(): Promise<Db> {
  if (cachedDb) return cachedDb;

  if (!ENV.MONGODB_URI || !ENV.MONGODB_DB_NAME) {
    throw new Error("Missing MongoDB connection environment variables");
  }

  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(ENV.MONGODB_URI);
      await cachedClient.connect();

      // Ping once after first connection
      const adminDb = cachedClient.db().admin();
      const pingResult = await adminDb.ping();
      if (pingResult.ok !== 1) {
        throw new Error("MongoDB ping failed");
      }
    }

    cachedDb = cachedClient.db(ENV.MONGODB_DB_NAME);
    return cachedDb;
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    throw error;
  }
}
