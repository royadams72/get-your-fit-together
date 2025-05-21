import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongodb";
import { DbResponse } from "@/types/interfaces/api";
import { ApiError } from "@/lib/services/ApiError";
import { handleApiError } from "@/lib/services/handleApiError";

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
      throw new ApiError(
        "A fitness plan already exists with that user name",
        409,
        true
      );
    } else {
      return NextResponse.json(
        { message: "No plan with that user name" },
        { status: 200 }
      );
    }
  } catch (error) {
    return handleApiError(error);
  }
}
