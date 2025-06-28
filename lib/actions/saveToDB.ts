"use server";
import { UpdateFilter, Document } from "mongodb";
import { connectToDB } from "@/lib/db/mongodb";

import { RootState } from "@/types/interfaces/store";
import { ResponseType } from "@/types/enums/response.enum";
import { UserFormType } from "@/types/interfaces/form";

import { verifySession } from "@/lib/server-functions/verifySession";
import { response } from "@/lib/services/response.service";

type SaveToDBResult = {
  success?: boolean;
  message?: string;
  redirect?: boolean;
  softError?: boolean;
};

export async function saveToDB(
  savedState: RootState,
  userData: UserFormType
): Promise<SaveToDBResult> {
  try {
    await verifySession(false);
    const db = await connectToDB();
    const collection = db.collection<Document>("reduxStates");

    const { uiData, journey, ...restOfState } = savedState as RootState;
    const userName = userData?.userName || undefined;
    const userPassword = userData?.userPassword || undefined;

    if (!userPassword && !userName) {
      return response(
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
      throw new Error(
        "There was a problem, your plan could not be saved, please try again later"
      );
    } else if (
      updateResult.matchedCount === 1 &&
      updateResult.modifiedCount === 0
    ) {
      throw new Error(
        "There was a problem, your plan could not be modified, please try again later"
      );
    }

    return { success: true };
  } catch (error) {
    return response(`Database error: ${error}`, ResponseType.redirect);
  }
}
