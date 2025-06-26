import redis from "@/lib/db/redisClient";

import { Cookie } from "@/types/enums/cookie.enum";
import { ResponseType } from "@/types/enums/response.enum";

import { response } from "@/lib/services/response.service";

export async function getStateFromRedis(sessionCookie: string) {
  try {
    const redisCache = await redis.get(`session:${sessionCookie}`);
    // const redisCache = null;

    if (!redisCache) {
      // throw new Error(`Could not get data from Redis geezzzzz`);
      return await response(
        `Could not get data from Redis`,
        ResponseType.redirect
      );
      // return;
    }
    // if (redisCache) {
    const data = JSON.parse(redisCache as unknown as string);

    return { ...data.state };
    // }
  } catch (error) {
    console.log(error);

    return await response(
      `Failed to store data: ${error}`,
      ResponseType.redirect
    );
  }
}
