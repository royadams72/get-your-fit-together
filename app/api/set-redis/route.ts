import { NextRequest, NextResponse } from "next/server";
import Redis from "ioredis";
import { v4 as uuidv4 } from "uuid";

import { ENV } from "@/lib/services/envService";
import cookieAction from "@/lib/actions/cookie.action";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
// localhost:6379

export async function POST(request: NextRequest) {
  const redis = new Redis(ENV.REDIS_URL, { keyPrefix: ENV.REDIS_KEY_PREFIX });
  const sessionTTL = 86400;
  try {
    const data = await request.json();
    let {
      state: {
        uiData: { sessionCookie },
      },
    } = data;
    console.log("POST redis:", ENV.REDIS_URL);

    const response = NextResponse.json({ message: "Data saved", status: 200 });

    console.log("!sessionCooki::=====", data.state.uiData.uiData);
    const isCookieInBrowser = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);
    if (!sessionCookie && !isCookieInBrowser) {
      sessionCookie = uuidv4();

      response.cookies.set("sessionCookie", sessionCookie, {
        path: "/",
        httpOnly: false,
        // sameSite: "lax",
        // secure: ENV.IS_PRODUCTION,
      });
    }

    const redisRespone = await redis.set(
      `session:${sessionCookie}`,
      JSON.stringify(data),
      "EX",
      sessionTTL
    );

    if (redisRespone !== "OK") {
      throw new Error(`Could not save data to Redis`);
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to store data: ${error}` },
      { status: 500 }
    );
  }
}
