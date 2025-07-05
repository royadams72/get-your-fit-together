import { saveStateToRedis } from "@/lib/actions/saveStateToRedis";
import * as cookie from "@/lib/actions/cookie.action";
import * as redis from "@/lib/actions/setRedis";

jest.mock("@/lib/actions/cookie.action", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/lib/actions/setRedis", () => ({
  setRedis: jest.fn(),
}));

describe("saveStateToRedis", () => {
  it("saves data successfully", async () => {
    (cookie.default as jest.Mock).mockResolvedValue("test-session-id");
    (redis.setRedis as jest.Mock).mockResolvedValue("OK");

    const response = await saveStateToRedis({ test: "data" });

    expect(response).toEqual({ message: "Data saved" });
  });

  it("fails without sessionId", async () => {
    (cookie.default as jest.Mock).mockResolvedValue(undefined);

    const result = await saveStateToRedis({});

    expect(result.message).toMatch(/Failed to store data/);
  });

  it("fails if Redis fails", async () => {
    (cookie.default as jest.Mock).mockResolvedValue("session-id");
    (redis.setRedis as jest.Mock).mockResolvedValue("FAIL");

    const result = await saveStateToRedis({});

    expect(result.message).toMatch(/Failed to store data/);
  });
});
