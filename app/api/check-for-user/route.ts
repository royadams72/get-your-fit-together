import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongodb";
import { DbResponse } from "@/types/interfaces/api";
import { errorResponse } from "@/lib/services/errorResponse";

export async function POST(req: Request) {
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");

    const userName = await req.json();

    const plan: DbResponse | null = await collection.findOne<DbResponse | null>(
      {
        "reduxState.user.user.userName": userName,
      }
    );

    if (plan) {
      return errorResponse(
        "A fitness plan already exists with that user name",
        409,
        false
      );
    } else {
      return NextResponse.json(
        { message: "No plan with that user name" },
        { status: 200 }
      );
    }
  } catch (error) {
    return errorResponse(`Any unexpected error occurred: ${error}`, 500, true);
  }
}
