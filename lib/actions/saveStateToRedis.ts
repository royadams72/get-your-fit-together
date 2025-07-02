"use server";

import redis from "@/lib/db/redisClient";
import { response } from "../services/response.service";
import { ResponseType } from "@/types/enums/response.enum";
import { CookieAction, Cookie } from "@/types/enums/cookie.enum";
import cookieAction from "./cookie.action";
import { setRedis } from "./setRedis";

export async function saveStateToRedis(data: any) {
  try {
    const sessionId = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);

    if (!sessionId) {
      throw new Error("Missing sessionId");
    }
    console.log("saveStateToRedis", data);

    const redisResponse = await setRedis(sessionId, data);

    if (redisResponse !== "OK") {
      throw new Error("Could not save data to Redis");
    }

    return { message: "Data saved" };
  } catch (error) {
    return response(
      `Failed to store data: ${error}`,
      ResponseType.redirect,
      true
    );
  }
}
