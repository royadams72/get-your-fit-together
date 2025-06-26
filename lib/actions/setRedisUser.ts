"use server";

import redis from "@/lib/db/redisClient";
import { Cookie } from "@/types/enums/cookie.enum";

const sessionTTL = 86400;

interface SessionData {
  userId?: string;
  anonymous?: boolean;
  [key: string]: any;
}

export const setRedisUser = async (sessionId: string, userId?: any) => {
  const existing = JSON.parse(
    (await redis.get(`session:${sessionId}`)) || "{}"
  );

  let redisCache: SessionData = { ...existing };
  if (userId) {
    redisCache = { ...existing, userId };
  } else if (!userId) {
    redisCache = { ...existing, anonymous: true };
  }

  await redis.set(
    `session:${sessionId}`,
    JSON.stringify(redisCache),
    "EX",
    sessionTTL
  );
  console.log(redisCache);
};
