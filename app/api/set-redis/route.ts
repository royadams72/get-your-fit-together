import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/db/redisClient";

export async function POST(request: NextRequest) {
  const sessionTTL = 86400;

  try {
    const data = await request.json();
    const {
      state: {
        uiData: {
          uiData: { sessionId },
        },
      },
    } = data;

    if (!sessionId) {
      throw new Error("Missing sessionId in state");
    }

    const redisResponse = await redis.set(
      `session:${sessionId}`,
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
