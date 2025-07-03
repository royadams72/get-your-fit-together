"use server";
import { UpdateFilter, Document } from "mongodb";
import { connectToDB } from "@/lib/db/mongodb";
import bcrypt from "bcryptjs";

import { RootState } from "@/types/interfaces/store";
import { ResponseType } from "@/types/enums/response.enum";
import { UserFormType } from "@/types/interfaces/form";

import { verifySession } from "@/lib/actions/verifySession";
import { response } from "@/lib/services/response.service";

type SaveToDBResult = {
  success?: boolean;
  message?: string;
  redirect?: boolean;
  softError?: boolean;
};

export async function saveToDB(
  savedState: RootState,
  userData: UserFormType,
  isForm: boolean
): Promise<SaveToDBResult> {
  try {
    await verifySession();
    const db = await connectToDB();
    const collection = db.collection<Document>("reduxStates");

    const { uiData, journey, ...restOfState } = savedState as RootState;
    const userName = userData?.userName || undefined;
    const userPassword = userData?.userPassword || undefined;

    if (!userPassword || !userName) {
      return response(
        "Please provide a username and password",
        ResponseType.softError
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = isForm
      ? bcrypt.hashSync(userPassword, salt)
      : userPassword;

    const documentFilter = {
      "reduxState.user.user.userName": userName,
    };

    const reduxState = {
      ...restOfState,
      user: {
        user: {
          ...restOfState.user.user,
          userName,
          userPassword: hashedPassword,
        },
      },
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
    return response(`${error}`, ResponseType.redirect, true);
  }
}
