"use server";
import redis from "@/lib/db/redisClient";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
import cookieAction from "@/lib/actions/cookie.action";
import { UserCache } from "@/types/interfaces/redis";
import { response } from "../services/response.service";
import { ResponseType } from "@/types/enums/response.enum";
import { ResponseObj } from "@/types/interfaces/response";

export async function verifySession(
  requireAuth = true
): Promise<UserCache | null | ResponseObj> {
  try {
    const sessionId = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);

    if (!sessionId) {
      if (requireAuth) throw new Error("Missing session");
      return null;
    }

    const raw = await redis.get(`session:${sessionId}`);
    if (!raw) {
      if (requireAuth) throw new Error("Invalid session");
      return null;
    }

    const session = JSON.parse(raw);

    const userId = session?.userId;
    const anonymous = session?.anonymous;
    const reduxState = session?.state;

    if (requireAuth && !userId) {
      throw new Error("Not authenticated");
    }

    return {
      userSessionState: reduxState ?? {},
      sessionMeta: {
        userId,
        anonymous,
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
