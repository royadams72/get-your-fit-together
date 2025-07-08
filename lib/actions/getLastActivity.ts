"use server";
import redis from "@/lib/db/redisClient";
import cookieAction from "@/lib/actions/cookie.action";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
import { response } from "@/lib/services/response.service";
import { ResponseType } from "@/types/enums/response.enum";

export async function getLastActivity() {
  try {
    const sessionId = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);
    if (!sessionId) throw new Error("Session has expired");
    const last = await redis.get(`session:${sessionId}:lastActivity`);
    return parseInt(last || "0");
  } catch (error) {
    response(`${error}`, ResponseType.redirect, true);
  }
}
