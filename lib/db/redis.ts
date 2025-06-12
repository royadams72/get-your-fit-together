import Redis from "ioredis";
import { ENV } from "../services/envService";

const redis = new Redis(ENV.REDIS_URL, { keyPrefix: ENV.REDIS_KEY_PREFIX });

export const setRedisData = async (sessionId: string, data: any) => {
  const sessionTTL = 86400;
  try {
    const response = await redis.set(
      `session:${sessionId}`,
      JSON.stringify(data),
      "EX",
      sessionTTL
    );

    if (response !== "OK") {
      throw new Error(`Could not save data setRedisData()`);
    }
  } catch (error) {
    return { message: "Error getting data:", error };
  }
};

export const getDBData = async (sessionId: string) => {
  const data = await redis.get(`session:${sessionId}`);
  return data ? JSON.parse(data) : null;
};
