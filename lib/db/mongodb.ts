import { MongoClient, Db } from "mongodb";
import { ENV } from "../services/envService";

let cachedDb: Db | null = null;

export async function connectToDB(): Promise<Db | undefined> {
  if (cachedDb) return cachedDb;
  console.log("ENV.MONGODB_DB_NAME: ", ENV.MONGODB_DB_NAME);
  console.log("cachedDb: ", cachedDb);
  try {
    const client = new MongoClient(ENV.MONGODB_URI);
    console.log("ENV.MONGODB_URI: ", ENV.MONGODB_URI);
    console.log("client: ", client);
    await client.connect();
    cachedDb = client.db(ENV.MONGODB_DB_NAME);
    console.log("client: cachedDb", cachedDb);
    return cachedDb;
  } catch (error) {
    console.error("Failed to connect to DB:", error);
  }
}
