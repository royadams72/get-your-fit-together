import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongodb";

import { DbResponse } from "@/types/interfaces/api";
import { isDbResponse } from "@/types/guards/db-response";

// import { errorResponse } from "@/lib/services/errorResponse";
import { isEmpty } from "@/lib/utils/isEmpty";
import { UserFormType } from "@/types/interfaces/form";

export async function getPlanFromDB(userData: UserFormType) {
  // console.log("POST retrieve plan from mongo");
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");

    // console.log("data in route", data);
    if (isEmpty(userData)) {
      return NextResponse.json(
        { message: "no data recieved" },
        { status: 200 }
      );
    }
    const userName = userData.userName || undefined;
    const userPassword = userData.userPassword || undefined;

    const documentFilter = {
      "reduxState.user.user.userName": userName,
      "reduxState.user.user.userPassword": userPassword,
    };

    const plan: DbResponse | null = await collection.findOne<DbResponse | null>(
      documentFilter
    );

    if (!plan) {
      throw new Error(
        "A plan with that user name and password combination was not found"
      );
    }

    if (isDbResponse(plan)) {
      const { reduxState } = plan;

      return reduxState;
    } else {
      throw new Error(
        "AI returned an unexpected structure, so your plan could not be retrieved"
      );
    }
  } catch (error) {
    console.error(error);
  }
}
