import "@testing-library/jest-dom";
import dotenv from "dotenv";
dotenv.config();

process.env.NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
process.env.MONGODB_URI = "mongodb/api/url";
process.env.OPENAI_API_KEY = "openapiKey1234";
process.env.MONGODB_DB_NAME = "MONGODB_DB_NAME";
