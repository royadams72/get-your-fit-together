"use server";

import { connectToDB } from "@/lib/db/mongodb";
import { errorResponse } from "@/lib/services/errorResponse";
import { UpdateFilter, Document } from "mongodb";
import { RootState } from "@/types/interfaces/store";
import { UserFormType } from "@/types/interfaces/form";

export async function saveToDB(
  savedState?: RootState,
  userData?: UserFormType
) {
  try {
    const db = await connectToDB();
    const collection = db.collection<Document>("reduxStates");

    const { uiData, journey, ...restOfState } = savedState as RootState;
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

    const response = await collection.updateOne(documentFilter, updatePayload, {
      upsert: true,
    });

    if (response.matchedCount === 0 && response.upsertedCount === 0) {
      // return errorResponse(
      //   "There was a problem, your plan could not be saved, please try again later",
      //   409,
      //   false
      // );
    } else if (response.matchedCount === 1 && response.modifiedCount === 0) {
      // throw new Error("There was a problem, updates could not be saved to your plan, please try again later");
      // return errorResponse(
      //   "There was a problem, updates could not be saved to your plan, please try again later",
      //   409,
      //   false
      // );
    }

    return { success: true };
  } catch (error) {
    return errorResponse(`Database error: ${error}`, 500, true);
  }
}
