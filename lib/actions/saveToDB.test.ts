import { saveToDB } from "./saveToDB";

import * as verify from "@/lib/actions/verifySession";
import * as db from "@/lib/db/mongodb";
import * as bcrypt from "bcryptjs";

const mockUpdateOne = jest.fn();

jest.mock("@/lib/actions/verifySession", () => ({
  verifySession: jest.fn(),
}));

jest.mock("@/lib/db/mongodb", () => ({
  connectToDB: jest.fn(),
}));

jest.mock("bcryptjs");

jest.mock("@/lib/services/response.service", () => ({
  response: jest.fn((message: string, type: any, redirect?: boolean) => ({
    success: false,
    message,
    redirect,
    softError: type === "softError",
  })),
}));

describe("saveToDB", () => {
  const mockUserData = {
    userName: "testuser",
    userPassword: "testpass",
  };

  const mockState = {
    uiData: {},
    journey: {},
    user: {
      user: {
        someOtherField: "abc",
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (verify.verifySession as jest.Mock).mockResolvedValue(true);
    (db.connectToDB as jest.Mock).mockResolvedValue({
      collection: () => ({
        updateOne: mockUpdateOne,
      }),
    });
    (bcrypt.genSaltSync as jest.Mock).mockReturnValue("salt");
    (bcrypt.hashSync as jest.Mock).mockReturnValue("hashed-password");
  });

  it("returns softError when username or password missing", async () => {
    const result = await saveToDB(
      mockState as any,
      { userName: "" } as any,
      true
    );
    expect(result.softError).toBe(true);
    expect(result.message).toMatch(/please provide/i);
  });

  it("returns success when upsert succeeds", async () => {
    mockUpdateOne.mockResolvedValueOnce({
      matchedCount: 1,
      modifiedCount: 1,
      upsertedCount: 0,
    });

    const result = await saveToDB(mockState as any, mockUserData as any, true);
    expect(result.success).toBe(true);
  });

  it("throws an error when insert fails", async () => {
    mockUpdateOne.mockResolvedValueOnce({
      matchedCount: 0,
      modifiedCount: 0,
      upsertedCount: 0,
    });

    const result = await saveToDB(mockState as any, mockUserData as any, true);
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/your plan could not be saved/i);
  });

  it("throws an error when modify fails", async () => {
    mockUpdateOne.mockResolvedValueOnce({
      matchedCount: 1,
      modifiedCount: 0,
      upsertedCount: 0,
    });

    const result = await saveToDB(mockState as any, mockUserData as any, true);
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/could not be modified/i);
  });
});
