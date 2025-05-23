import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongodb";

import { DbResponse } from "@/types/interfaces/api";
import { isDbResponse } from "@/types/guards/db-response";

import { errorResponse } from "@/lib/services/errorResponse";

export async function POST(req: Request) {
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");

    const { userPassword, userName } = await req.json();

    const plan: DbResponse | null = await collection.findOne<DbResponse | null>(
      {
        "reduxState.user.user.userName": userName,
        "reduxState.user.user.userPassword": userPassword,
      }
    );

    if (!plan) {
      return errorResponse(
        "A plan with that user name and password combination was not found",
        404,
        false
      );
    }

    if (isDbResponse(plan)) {
      const { reduxState } = plan;
      return NextResponse.json(reduxState, { status: 200 });
    } else {
      return errorResponse(
        "AI returned an unexpected structure, so your plan could not be retrieved",
        502,
        true
      );
    }
  } catch (error) {
    return errorResponse(`Database error: ${error}`, 500, true);
  }
}
