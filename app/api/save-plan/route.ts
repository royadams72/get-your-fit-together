import { NextResponse } from "next/server";

import { connectToDB } from "@/lib/db/mongodb";
import { errorResponse } from "@/lib/services/errorResponse";

export async function POST(req: Request) {
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");
    const { savedState, sessionCookie, userData } = await req.json();
    const { _persist, uiData, journey, ...restOfState } = savedState;
    const userName = userData?.userName || undefined;
    const userPassword = userData?.userPassword || undefined;
    const userIsSaving = userName && userPassword;
    let reduxState: any;
    let documentFilter = {};
    console.log("sessionCookie:", sessionCookie);

    // Conditionally remove sessionCookie if user is saving with credentials

    if (userIsSaving) {
      reduxState = {
        ...restOfState,
        user: { user: { ...restOfState.user.user, userPassword, userName } },
      };

      documentFilter = {
        "reduxState.user.user.userName": userName,
        "reduxState.user.user.userPassword": userPassword,
      };
    } else {
      reduxState = { ...restOfState };
      documentFilter = {
        sessionCookie: sessionCookie,
      };
      // console.log("reduxState in eles:", reduxState);
    }

    const updatePayload: any = {
      $set: {
        reduxState: reduxState,
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
      $currentDate: { updatedAt: true },
    };
    const response = await collection.updateOne(documentFilter, updatePayload, {
      upsert: true,
    });
    // console.log("updatePayload:", updatePayload);
    if (userIsSaving) {
      updatePayload.$unset = { sessionCookie: "" };
    }
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
