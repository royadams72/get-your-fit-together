"use server";

import redis from "@/lib/db/redisClient";

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
  console.log("redisCache:::", redisCache);

  if (userId) {
    const { anonymous, ...restOfExisting } = existing;
    redisCache = { ...restOfExisting, userId };
  } else {
    redisCache = { ...existing, anonymous: true };
  }
  console.log("redisCache2:::", redisCache);
  await redis.set(
    `session:${sessionId}`,
    JSON.stringify(redisCache),
    "EX",
    sessionTTL
  );
};
