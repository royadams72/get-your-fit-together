import { MongoClient, Db } from "mongodb";
import { ENV } from "../services/envService";

// const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = "get-your-fit-together"; // Your actual database name

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

let cachedDb: Db | null = null; // Return `Db` instead of `MongoClient`

export async function connectToDB(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = new MongoClient(ENV.MONGODB_URI);
  await client.connect();
  cachedDb = client.db(MONGODB_DB); // Return the `Db` instance
  return cachedDb;
}
