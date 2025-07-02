"use server";
import redis from "../db/redisClient";

export const setRedis = async (sessionId: string, data?: any) => {
  const sessionTTL = 86400;
  if (!data) {
    // Only refresh lastActivity TTL, don't overwrite session
    await redis.set(
      `session:${sessionId}:lastActivity`,
      Date.now().toString(),
      "EX",
      sessionTTL
    );
    return { message: "lastActivity refreshed" };
  }

  const redisResponse = await redis.set(
    `session:${sessionId}`,
    JSON.stringify(data),
    "EX",
    sessionTTL
  );

  await redis.set(
    `session:${sessionId}:lastActivity`,
    Date.now().toString(),
    "EX",
    sessionTTL
  );

  return redisResponse || { message: "session updated" };
};
