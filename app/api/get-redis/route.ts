import { NextResponse } from "next/server";

import redis from "@/lib/db/redisClient";

import cookieAction from "@/lib/actions/cookie.action";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
// localhost:6379

export async function GET() {
  try {
    const sessionCookie = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);

    const redisCache = await redis.get(`sessionCookie${sessionCookie}`);
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
