"use server";
import redis from "@/lib/db/redisClient";

const sessionTTL = 86400;

interface SessionMeta {
  userId?: string;
  anonymous?: boolean;
}

interface SessionData {
  userSessionState?: any; // should be RootState ideally
  sessionMeta: SessionMeta;
}

export const setRedisUser = async (sessionId: string, userId?: string) => {
  // Get the existing session if any
  const existing: SessionData = JSON.parse(
    (await redis.get(`session:${sessionId}`)) || "{}"
  );

  const userSessionState = existing.userSessionState || {};
  let sessionMeta: SessionMeta = existing.sessionMeta || {};

  // Update metadata based on userId presence
  if (userId) {
    sessionMeta = { userId };
  } else {
    sessionMeta = { anonymous: true };
  }

  const updatedSession: SessionData = {
    userSessionState,
    sessionMeta,
  };

  console.log("setRedisUser:: updatedSession", updatedSession);

  await redis.set(
    `session:${sessionId}`,
    JSON.stringify(updatedSession),
    "EX",
    sessionTTL
  );
};
