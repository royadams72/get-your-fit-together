"use server";
import redis from "@/lib/db/redisClient";

import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
import { UserCache } from "@/types/interfaces/redis";
import { ResponseType } from "@/types/enums/response.enum";
import { ResponseObj } from "@/types/interfaces/response";
import { SESSION_TTL_MS, SESSION_TTL_SECONDS } from "@/lib/constants/session";

import cookieAction from "@/lib/actions/cookie.action";
import { response } from "@/lib/services/response.service";

export async function verifySession(
  strict = false
): Promise<UserCache | null | ResponseObj> {
  try {
    const sessionId = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);
    if (!sessionId) throw new Error("Session has expired");

    const lastActivity = await redis.get(`session:${sessionId}:lastActivity`);
    const lastActivityTime = parseInt(lastActivity ?? "");

    const isExpired =
      !lastActivity ||
      isNaN(lastActivityTime) ||
      Date.now() - lastActivityTime > SESSION_TTL_MS;

    if (isExpired) {
      await redis.del(`session:${sessionId}`);
      await redis.del(`session:${sessionId}:lastActivity`);
      throw new Error("Session expired due to inactivity");
    }

    // Refresh lastActivity
    await redis.set(
      `session:${sessionId}:lastActivity`,
      Date.now().toString(),
      "EX",
      SESSION_TTL_SECONDS
    );

    const raw = await redis.get(`session:${sessionId}`);
    if (!raw) {
      if (strict) throw new Error("No session data found");
      return {
        userSessionState: {},
        sessionMeta: {
          userId: null,
          anonymous: true,
          sessionId,
        },
      } as UserCache;
    }

    const session = JSON.parse(raw);
    return {
      userSessionState: session ?? {},
      sessionMeta: {
        userId: session?.userId ?? null,
        anonymous: session?.anonymous ?? true,
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
