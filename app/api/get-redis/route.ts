import { NextResponse } from "next/server";

import redis from "@/lib/db/redisClient";

import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
import cookieAction from "@/lib/actions/cookie.action";

export async function GET() {
  try {
    const sessionCookie = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);

    const redisCache = await redis.get(
      `${Cookie.sessionCookie}:${sessionCookie}`
    );

    if (!redisCache) {
      throw new Error(`Could not get data from Redis`);
    }

    const data = JSON.parse(redisCache as string);

    return NextResponse.json(data.state, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to store data: ${error}` },
      { status: 500 }
    );
  }
}
