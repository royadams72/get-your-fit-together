import { NextResponse } from "next/server";

import redis from "@/lib/db/redisClient";

import { Cookie } from "@/types/enums/cookie.enum";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("sessionCookie")?.value;

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
