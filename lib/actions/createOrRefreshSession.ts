"use server";
import { v4 as uuidv4 } from "uuid";
import { CookieAction, Cookie } from "@/types/enums/cookie.enum";
import { SESSION_TTL_SECONDS } from "@/lib/constants/session";
import cookieAction from "./cookie.action";
import redis from "@/lib/db/redisClient";

const createOrRefreshSession = async (shouldCreateNew = true) => {
  const sessionCookie = await cookieAction(CookieAction.get, [
    Cookie.sessionCookie,
  ]);

  let sessionId = sessionCookie;
  if (!sessionCookie && shouldCreateNew) {
    sessionId = uuidv4();
    console.log("No session cookie found. Creating new:", sessionId);
  } else {
    console.log("Existing session cookie found. Refreshing:", sessionId);
  }

  if (sessionId) {
    await cookieAction(
      CookieAction.set,
      [Cookie.sessionCookie],
      [sessionId],
      [{ maxAge: SESSION_TTL_SECONDS, httpOnly: true }]
    );
    await redis.set(
      `session:${sessionId}:lastActivity`,
      Date.now().toString(),
      "EX",
      SESSION_TTL_SECONDS
    );
  }

  return sessionId ?? undefined;
};

export default createOrRefreshSession;
