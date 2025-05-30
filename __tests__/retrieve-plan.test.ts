/**
 * @jest-environment node
 */

import { POST } from "@/app/api/retrieve-plan/route";
import { connectToDB } from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";
import { reduxMock } from "@/__mocks__/reduxMock";

jest.mock("@/lib/db/mongodb");

const mockFindOne = jest.fn();

const { journey, _persist, uiData, ...reduxMockFomMongo } = reduxMock;
const mongoDbResponse = {
  _id: new ObjectId("68304081f05a9b4cf094d6fc"),
  reduxState: reduxMockFomMongo,
};

(connectToDB as jest.Mock).mockResolvedValue({
  collection: jest.fn().mockReturnValue({
    findOne: mockFindOne,
  }),
});

describe("POST /api/retrieve-plan", () => {
  const createRequest = (): Request =>
    ({
      json: jest.fn().mockResolvedValue({
        userName: "clientUserName",
        userPassword: "clientPassword",
      }),
    } as unknown as Request);

  it("returns 200 if a plan exists with that username and password", async () => {
    mockFindOne.mockResolvedValue(mongoDbResponse);

    const response = await POST(createRequest());
    expect(response.status).toBe(200);
  });

  it("returns 404 if no plan exists with that user name", async () => {
    mockFindOne.mockResolvedValue(null);

    const response = await POST(createRequest());
    expect(response.status).toBe(404);

    const json = await response.json();
    expect(json).toEqual({
      error:
        "A plan with that user name and password combination was not found",
      redirect: false,
    });
  });

  it("returns 502 if no plan exists with that user name", async () => {
    const {
      reduxState: { user, aboutYou, injuries },
    } = mongoDbResponse;

    const partial = {
      _id: new ObjectId("68304081f05a9b4cf094d6fc"),
      reduxState: { user, aboutYou, injuries },
    };

    mockFindOne.mockResolvedValue(partial);

    const response = await POST(createRequest());
    expect(response.status).toBe(502);

    const json = await response.json();
    expect(json).toEqual({
      error:
        "AI returned an unexpected structure, so your plan could not be retrieved",
      redirect: true,
    });
  });

  it("returns 500 if an unexpected error occurs", async () => {
    mockFindOne.mockRejectedValue(new Error("DB failure"));

    const response = await POST(createRequest());
    expect(response.status).toBe(500);

    const json = await response.json();
    expect(json).toEqual({
      error: "Database error: Error: DB failure",
      redirect: true,
    });
  });
});
