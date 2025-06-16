import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import redis from "@/lib/db/redisClient";
import { ENV } from "@/lib/services/envService";
import cookieAction from "@/lib/actions/cookie.action";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
// localhost:6379

export async function GET(request: NextRequest) {
  // console.log("redi÷s:::::", redis);

  try {
    // console.log("!sessionCooki::=====", data.state.preferences.preferences);
    const sessionCookie = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);

    const redisCache = await redis.get(`sessionCookie:${sessionCookie}`);
    const data = JSON.parse(redisCache as string);
    // if (redisRespone !== "OK") {
    //   throw new Error(`Could not save data to Redis`);
    // }
    // console.log("redis GET:::::", typeof data);

    return NextResponse.json(data.state, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to store data: ${error}` },
      { status: 500 }
    );
  }
}
