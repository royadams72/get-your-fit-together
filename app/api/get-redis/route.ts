import { NextRequest, NextResponse } from "next/server";

import redis from "@/lib/db/redisClient";

import cookieAction from "@/lib/actions/cookie.action";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
import { cookies } from "next/headers";
// localhost:6379

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("sessionCookie")?.value;
    // const sessionCookie = await cookieAction(CookieAction.get, [
    //   Cookie.sessionCookie,
    // ]);
    // console.log("sessionCookie GET::", sessionCookie);

    const redisCache = await redis.get(
      `${Cookie.sessionCookie}:${sessionCookie}`
    );
    // console.log(redisCache);

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
