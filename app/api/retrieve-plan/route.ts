import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongodb";

import { DbResponse } from "@/types/interfaces/api";
import { isDbResponse } from "@/types/guards/db-response";

import { errorResponse } from "@/lib/services/errorResponse";
import { isEmpty } from "@/lib/utils/isEmpty";

export async function POST(req: Request) {
  // console.log("POST retrieve plan from mongo");
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");

    const data = await req.json();
    console.log("data in route", data);
    if (isEmpty(data)) {
      return NextResponse.json(
        { message: "no data recieved" },
        { status: 200 }
      );
    }
    const userName = data.userName || undefined;
    const userPassword = data.userPassword || undefined;

    const documentFilter = {
      "reduxState.user.user.userName": userName,
      "reduxState.user.user.userPassword": userPassword,
    };

    const plan: DbResponse | null = await collection.findOne<DbResponse | null>(
      documentFilter
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
