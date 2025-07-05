/**
 * @jest-environment node
 */

import { checkForUser } from "./checkForUser";
import { connectToDB } from "@/lib/db/mongodb";

jest.mock("@/lib/db/mongodb");

const mockFindOne = jest.fn();

(connectToDB as jest.Mock).mockResolvedValue({
  collection: jest.fn().mockReturnValue({
    findOne: mockFindOne,
  }),
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
