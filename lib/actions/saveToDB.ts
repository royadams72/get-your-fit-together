"use server";

import { connectToDB } from "@/lib/db/mongodb";
import { response, ResponseType } from "@/lib/services/response.service";
import { UpdateFilter, Document } from "mongodb";
import { RootState } from "@/types/interfaces/store";
import { UserFormType } from "@/types/interfaces/form";
import { redirect } from "next/dist/server/api-utils";

export async function saveToDB(savedState: RootState, userData: UserFormType) {
  try {
    const db = await connectToDB();
    const collection = db.collection<Document>("reduxStates");

    const { uiData, journey, ...restOfState } = savedState as RootState;
    const userName = userData?.userName || undefined;
    const userPassword = userData?.userPassword || undefined;
    console.log("userName:", userName, "userPassword:", userPassword);

    if (!userPassword && !userName) {
      return await response(
        "Please provide a username and password",
        ResponseType.softError
      );
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

    const updateResult = await collection.updateOne(
      documentFilter,
      updatePayload,
      {
        upsert: true,
      }
    );

    if (updateResult.matchedCount === 0 && updateResult.upsertedCount === 0) {
      return await response(
        "There was a problem, updates could not be saved to your plan, please try again later",
        ResponseType.redirect
      );
    } else if (
      updateResult.matchedCount === 1 &&
      updateResult.modifiedCount === 0
    ) {
      return await response(
        "There was a problem, updates could not be saved to your plan, please try again later",
        ResponseType.redirect
      );
    }

    return { success: true };
  } catch (error) {
    console.error(`Database error: ${error}`);
    return await response(`Database error: ${error}`, ResponseType.redirect);
  }
}
