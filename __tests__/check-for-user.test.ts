/**
 * @jest-environment node
 */

import { POST } from "@/app/api/check-for-user/route";
import { connectToDB } from "@/lib/db/mongodb";

jest.mock("@/lib/db/mongodb");

const mockFindOne = jest.fn();

(connectToDB as jest.Mock).mockResolvedValue({
  collection: jest.fn().mockReturnValue({
    findOne: mockFindOne,
  }),
});

describe("POST /api/check-plan", () => {
  const createRequest = (userName: string): Request =>
    ({
      json: jest.fn().mockResolvedValue(userName),
    } as unknown as Request);

  it("returns 409 if a plan exists with that user name", async () => {
    const existingPlan = {
      reduxState: { user: { user: { userName: "testUser" } } },
    };
    mockFindOne.mockResolvedValue(existingPlan);

    const response = await POST(createRequest("testUser"));
    expect(response.status).toBe(409);

    const json = await response.json();
    expect(json).toEqual({
      error: "A fitness plan already exists with that user name",
      redirect: false,
    });
  });

  it("returns 200 if no plan exists with that user name", async () => {
    mockFindOne.mockResolvedValue(null);

    const response = await POST(createRequest("newUser"));
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json).toEqual({
      message: "No plan with that user name",
    });
  });

  it("returns 500 if an unexpected error occurs", async () => {
    mockFindOne.mockRejectedValue(new Error("DB failure"));

    const response = await POST(createRequest("errorUser"));
    expect(response.status).toBe(500);

    const json = await response.json();
    expect(json).toEqual({
      error: expect.stringContaining(
        "An unexpected error occurred: Error: DB failure"
      ),
      redirect: true,
    });
  });
});
