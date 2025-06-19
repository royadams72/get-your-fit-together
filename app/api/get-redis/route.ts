import { NextResponse } from "next/server";

import redis from "@/lib/db/redisClient";

import { Cookie, CookieAction } from "@/types/enums/cookie.enum";

export async function GET() {
  try {
    let sessionCookie = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);
    let retries = 3;
    while (!sessionCookie && retries > 0) {
      console.log("GET retries:", retries, sessionCookie);

      if (!sessionCookie) {
        await new Promise((res) => setTimeout(res, 100));
        sessionCookie = await cookieAction(CookieAction.get, [
          Cookie.sessionCookie,
        ]);
        retries--;
      }
    }

    const redisCache = await redis.get(
      `${Cookie.sessionCookie}:${sessionCookie}`
    );

    const data = JSON.parse(redisCache as string);

    if (!redisCache) {
      throw new Error(`Could not get data from Redis`);
    }

    return NextResponse.json(data.state, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to store data: ${error}` },
      { status: 500 }
    );
  }
}
function cookieAction(
  get: any,
  arg1: Cookie[]
): string | PromiseLike<string | undefined> | undefined {
  throw new Error("Function not implemented.");
}
