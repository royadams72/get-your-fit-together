import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import redis from "@/lib/db/redisClient";
import { ENV } from "@/lib/services/envService";
import cookieAction from "@/lib/actions/cookie.action";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
// localhost:6379

export async function POST(request: NextRequest) {
  // console.log("redi÷s:::::", redis);

  const sessionTTL = 86400;
  try {
    const data = await request.json();
    let {
      state: {
        uiData: { sessionCookie },
      },
    } = data;
    console.log("POST redis:", ENV.REDIS_URL);

    const response = NextResponse.json(
      { message: "Data saved" },
      { status: 200 }
    );

    // console.log("!sessionCooki::=====", data.state.preferences.preferences);
    const isCookieInBrowser = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);
    if (!sessionCookie && !isCookieInBrowser) {
      sessionCookie = uuidv4();

      response.cookies.set("sessionCookie:", sessionCookie, {
        path: "/",
        httpOnly: false,
        // sameSite: "lax",
        // secure: ENV.IS_PRODUCTION,
      });
    }

    const redisRespone = await redis.set(
      `sessionCookie:${sessionCookie}`,
      JSON.stringify(data),
      "EX",
      sessionTTL
    );
    // const redisGet = await redis.get(`sessionCookie:${sessionCookie}`);
    // console.log("redis ttl::", redisGet);

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
