"use server";
import redis from "@/lib/db/redisClient";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
import cookieAction from "@/lib/actions/cookie.action";
import { UserCache } from "@/types/interfaces/redis";
import { response } from "../services/response.service";
import { ResponseType } from "@/types/enums/response.enum";
import { ResponseObj } from "@/types/interfaces/response";

export async function verifySession(): Promise<UserCache | null | ResponseObj> {
  try {
    const sessionId = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);
    if (!sessionId) {
      throw new Error("Session has expired");
    }

    const lastActivity = await redis.get(`session:${sessionId}:lastActivity`);
    const INACTIVITY_LIMIT_MS = 30 * 60 * 1000;

    const lastActivityTime = parseInt(lastActivity ?? "");
    // console.log(
    //   "verifySession lastActivityTime, lastActivity",
    //   lastActivityTime,
    //   lastActivity
    // );

    const isExpired =
      !lastActivity ||
      isNaN(lastActivityTime) ||
      Date.now() - lastActivityTime > INACTIVITY_LIMIT_MS;

    if (isExpired) {
      await redis.del(`session:${sessionId}`);
      await redis.del(`session:${sessionId}:lastActivity`);
      throw new Error("Session expired due to inactivity");
    }

    const raw = await redis.get(`session:${sessionId}`);
    if (!raw) {
      throw new Error("Invalid session");
    }

    const session = JSON.parse(raw);

    const userId = session?.userId;
    const anonymous = session?.anonymous;
    const reduxState = session;
    // console.log("verifySession:", "session: ", session);

    return {
      userSessionState: reduxState ?? {},
      sessionMeta: {
        userId,
        anonymous,
        sessionId,
      },
    };
  } catch (error) {
    return response(
      `Error in verifySession: ${error}`,
      ResponseType.redirect,
      true
    );
  }
}
