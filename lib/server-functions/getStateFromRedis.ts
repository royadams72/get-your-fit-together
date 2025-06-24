import redis from "@/lib/db/redisClient";

import { Cookie } from "@/types/enums/cookie.enum";

export async function getStateFromRedis(sessionCookie: string) {
  try {
    const redisCache = await redis.get(
      `${Cookie.sessionCookie}:${sessionCookie}`
    );

    if (!redisCache) {
      throw new Error(`Could not get data from Redis`);
    }

    const data = JSON.parse(redisCache as string);

    return { ...data.state };
  } catch (error) {
    return { message: `Failed to store data: ${error}` };
  }
}
