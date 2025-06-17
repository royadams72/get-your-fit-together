import { NextResponse } from "next/server";

import { connectToDB } from "@/lib/db/mongodb";
import { errorResponse } from "@/lib/services/errorResponse";
import { UpdateFilter, Document } from "mongodb";

export async function POST(req: Request) {
  try {
    const db = await connectToDB();
    const collection = db.collection<Document>("reduxStates");
    const { savedState, userData } = await req.json();
    const { uiData, journey, ...restOfState } = savedState;
    const userName = userData?.userName || undefined;
    const userPassword = userData?.userPassword || undefined;

    if (!userPassword && !userName) {
      return errorResponse("Pleas provide a username and password", 404, false);
    }

    const reduxState = {
      ...restOfState,
      user: { user: { ...restOfState.user.user, userPassword, userName } },
    };

    const documentFilter = {
      "reduxState.user.user.userName": userName,
      "reduxState.user.user.userPassword": userPassword,
    };

    const updatePayload: UpdateFilter<Document> = {
      $set: {
        reduxState: reduxState,
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
      $currentDate: { updatedAt: true },
    };

    console.log("save-plan", userPassword && userName, updatePayload);
    const response = await collection.updateOne(documentFilter, updatePayload, {
      upsert: true,
    });
    console.log("save-plan response:", response);
    if (response.matchedCount === 0 && response.upsertedCount === 0) {
      return errorResponse(
        "There was a problem, your plan could not be saved, please try again later",
        409,
        false
      );
    } else if (response.matchedCount === 1 && response.modifiedCount === 0) {
      return errorResponse(
        "There was a problem, updates could not be saved to your plan, please try again later",
        409,
        false
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse(`Database error: ${error}`, 500, true);
  }
}
