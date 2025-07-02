"use server";

import redis from "@/lib/db/redisClient";
import { response } from "../services/response.service";
import { ResponseType } from "@/types/enums/response.enum";
import { CookieAction, Cookie } from "@/types/enums/cookie.enum";
import cookieAction from "./cookie.action";

export async function saveStateToRedis(data: any) {
  const sessionTTL = 86400;
  try {
    const sessionId = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);

    if (!sessionId) {
      throw new Error("Missing sessionId");
    }

    const redisResponse = await redis.set(
      `session:${sessionId}`,
      JSON.stringify(data),
      "EX",
      sessionTTL
    );

    if (redisResponse !== "OK") {
      throw new Error("Could not save data to Redis");
    }

    await redis.set(
      `session:${sessionId}:lastActivity`,
      Date.now().toString(),
      "EX",
      sessionTTL
    );

    return { message: "Data saved" };
  } catch (error) {
    return response(
      `Failed to store data: ${error}`,
      ResponseType.redirect,
      true
    );
  }
}
