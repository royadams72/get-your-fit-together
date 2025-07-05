/**
 * @jest-environment node
 */

import { checkForUser } from "./checkForUser";
import { connectToDB } from "@/lib/db/mongodb";

// ✅ Fully mock the DB module
jest.mock("@/lib/db/mongodb", () => ({
  connectToDB: jest.fn(),
}));

const mockConnectToDB = connectToDB as jest.Mock;

const mockFindOne = jest.fn();
jest.mock("@/lib/db/redisClient", () => ({
  default: {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  },
}));
beforeEach(() => {
  mockConnectToDB.mockResolvedValue({
    collection: jest.fn().mockReturnValue({
      findOne: mockFindOne,
    }),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Check for user", () => {
  it("returns a plan exists with that user name", async () => {
    const existingPlan = {
      reduxState: { user: { user: { userName: "testUser" } } },
    };
    mockFindOne.mockResolvedValue(existingPlan);

    const response = await checkForUser("testUser");
    expect(response).toEqual({
      message: "A fitness plan already exists with that user name",
      softError: true,
    });
  });

  it("returns a no plan exists with that user name", async () => {
    mockFindOne.mockResolvedValue(null);

    const response = await checkForUser("myName");
    expect(response).toEqual({
      message: "No plan with that user name",
    });
  });

  it("returns 500 if an unexpected error occurs", async () => {
    mockFindOne.mockRejectedValue(new Error("DB failure"));

    const response = await checkForUser("myName");

    expect(response).toEqual({
      message: expect.stringContaining("Database error: Error: DB failure"),
      redirect: true,
    });
  });
});
