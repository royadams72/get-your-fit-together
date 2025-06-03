import { MongoClient, Db } from "mongodb";
import { ENV } from "../services/envService";

let cachedDb: Db | null = null;

export async function connectToDB(): Promise<Db> {
  if (cachedDb) return cachedDb;
  console.log("ENV.MONGODB_DB_NAME: ", ENV.MONGODB_DB_NAME);
  console.log("cachedDb: ", cachedDb);
  const client = new MongoClient(ENV.MONGODB_URI);
  console.log("ENV.MONGODB_URI: ", ENV.MONGODB_URI);
  console.log("client: ", client);
  try {
    await client.connect();
    const adminDb = client.db().admin();
    const pingResult = await adminDb.ping();
    console.log("Ping successful:", pingResult);
    if (pingResult.ok !== 1) {
      throw new Error("MongoDB does not exist");
    }
    cachedDb = client.db(ENV.MONGODB_DB_NAME);
    console.log("client: cachedDb", cachedDb);
    return cachedDb;
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    throw error;
  }
}
