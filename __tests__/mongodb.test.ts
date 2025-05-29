/**
 * @jest-environment node
 */

import { connectToDB } from "@/lib/db/mongodb";
import { Db } from "mongodb";

// Create the mock functions and client
const mockConnect = jest.fn();
const mockDb = jest.fn();
const mockClient = {
  connect: mockConnect,
  db: mockDb,
};

// Mock MongoClient itself
jest.mock("mongodb", () => {
  const actual = jest.requireActual("mongodb");
  return {
    ...actual,
    MongoClient: jest.fn().mockImplementation(() => mockClient),
  };
});

describe("connectToDB", () => {
  const mockDbInstance = {} as unknown as Db;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    mockDb.mockReturnValue(mockDbInstance);
  });

  it("returns the cached database if already connected", async () => {
    const db1 = await connectToDB();
    const db2 = await connectToDB();

    expect(db1).toBe(db2);
  });

  // it("throws an error if MONGODB_URI is not defined", async () => {
  //   const originalUri = process.env.MONGODB_URI;
  //   delete process.env.MONGODB_URI;

  //   await expect(import("@/lib/db/mongodb")).rejects.toThrow(
  //     "Environment variable MONGODB_URI is not defined"
  //   );

  //   process.env.MONGODB_URI = originalUri;
  // });
});
