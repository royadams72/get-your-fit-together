import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/db/redisClient";
import { v4 as uuidv4 } from "uuid";

import cookieAction from "@/lib/actions/cookie.action";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";

export async function POST(request: NextRequest) {
  const sessionTTL = 86400;

  try {
    const data = await request.json();
    const {
      state: {
        uiData: { sessionCookie: cookieFromState },
      },
    } = data;

    const response = NextResponse.json({ message: "Data saved" });
    const cookieFromBrowser = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);

    // Decide source of truth
    const sessionCookie = cookieFromState || cookieFromBrowser || uuidv4();

    // Set cookie if not in browser
    if (!cookieFromBrowser) {
      response.cookies.set("sessionCookie", sessionCookie, {
        path: "/",
        httpOnly: false,
        expires: 60,
        // sameSite: "lax",
        // secure: ENV.IS_PRODUCTION,
      });
    }

    // Save to Redis
    const redisRespone = await redis.set(
      `${Cookie.sessionCookie}:${sessionCookie}`,
      JSON.stringify(data),
      "EX",
      sessionTTL
    );

    if (redisRespone !== "OK") {
      throw new Error("Could not save data to Redis");
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to store data: ${error}` },
      { status: 500 }
    );
  }
}
