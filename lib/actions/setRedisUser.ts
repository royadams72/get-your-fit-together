"use server";

import redis from "@/lib/db/redisClient";
import { response } from "@/lib/services/response.service";
import { ResponseType } from "@/types/enums/response.enum";
import { RootState } from "@/types/interfaces/store";

const sessionTTL = 86400;

interface SessionMeta {
  userId?: string;
  anonymous?: boolean;
}

interface SessionData {
  userSessionState?: RootState;
  sessionMeta: SessionMeta;
}

export const setRedisUser = async (
  sessionId: string,
  userId?: string,
  isServerAction = false
) => {
  try {
    const existing: SessionData = JSON.parse(
      (await redis.get(`session:${sessionId}`)) || "{}"
    );

    const userSessionState = existing.userSessionState || ({} as RootState);
    let sessionMeta: SessionMeta = existing.sessionMeta || {};

    // Update metadata
    sessionMeta = userId ? { userId } : { anonymous: true };

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

    return { message: "Redis session updated" };
  } catch (error) {
    return response(
      `Error in setRedisUser: ${error}`,
      ResponseType.redirect,
      isServerAction
    );
  }
};
