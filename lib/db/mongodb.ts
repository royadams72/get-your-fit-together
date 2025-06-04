import { MongoClient, Db } from "mongodb";
import { ENV } from "../services/envService";

let cachedDb: Db | null = null;

export async function connectToDB(): Promise<Db> {
  if (cachedDb) return cachedDb;
  const client = new MongoClient(ENV.MONGODB_URI);

  try {
    await client.connect();
    const adminDb = client.db().admin();
    const pingResult = await adminDb.ping();

    if (pingResult.ok !== 1) {
      throw new Error("MongoDB does not exist");
    }

    cachedDb = client.db(ENV.MONGODB_DB_NAME);
    return cachedDb;
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    throw error;
  }
}
