import { MongoClient, Db } from "mongodb";
import { ENV } from "../services/envService";

let cachedDb: Db | null = null;

export async function connectToDB(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = new MongoClient(ENV.MONGODB_URI);
  await client.connect();
  cachedDb = client.db(ENV.MONGODB_DB_NAME);
  return cachedDb;
}
