import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/db/redisClient";
import { Cookie } from "@/types/enums/cookie.enum";

export async function POST(request: NextRequest) {
  const sessionTTL = 86400;

  try {
    const data = await request.json();
    const {
      state: {
        uiData: {
          uiData: { sessionCookie },
        },
      },
    } = data;

    if (!sessionCookie) {
      throw new Error("Missing sessionCookie in state");
    }

    const redisResponse = await redis.set(
      `${Cookie.sessionCookie}:${sessionCookie}`,
      JSON.stringify(data),
      "EX",
      sessionTTL
    );

    if (redisResponse !== "OK") {
      throw new Error("Could not save data to Redis");
    }

    return NextResponse.json({ message: "Data saved" });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to store data: ${error}` },
      { status: 500 }
    );
  }
}
