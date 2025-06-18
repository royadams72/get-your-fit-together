import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import redis from "@/lib/db/redisClient";
import { ENV } from "@/lib/services/envService";
import cookieAction from "@/lib/actions/cookie.action";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";

export async function POST(request: NextRequest) {
  const sessionTTL = 86400;
  try {
    const cookie = request.headers.get("cookie");
    const data = await request.json();
    let {
      state: {
        uiData: { sessionCookie },
      },
    } = data;

    const response = NextResponse.json(
      { message: "Data saved" },
      { status: 200 }
    );

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
    // console.log("isCookieInBrowser", isCookieInBrowser, sessionCookie);

    const redisRespone = await redis.set(
      `${Cookie.sessionCookie}:${isCookieInBrowser || sessionCookie}`,
      JSON.stringify(data),
      "EX",
      sessionTTL
    );
    // console.log(redisRespone);

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
