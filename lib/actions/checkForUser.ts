"use server";

import { connectToDB } from "@/lib/db/mongodb";
import { DbResponse } from "@/types/interfaces/response";
import { ResponseType } from "@/types/enums/response.enum";
import { response } from "@/lib/services/response.service";
import { verifySession } from "../server-functions/verifySession";

export async function checkForUser(userName: string) {
  try {
    await verifySession(false);
    const db = await connectToDB();
    const collection = db.collection("reduxStates");

    const plan: DbResponse | null = await collection.findOne<DbResponse | null>(
      {
        "reduxState.user.user.userName": userName,
      }
    );

    if (plan) {
      throw new Error("A fitness plan already exists with that user name");
      // return response(
      //   "A fitness plan already exists with that user name",
      //   ResponseType.softError
      // );
    } else {
      return response("No plan with that user name");
    }
  } catch (error) {
    // throw new Error(`Any unexpected error occurred: ${error}`);
    return response(
      `Any unexpected error occurred: ${error}`,
      ResponseType.redirect
    );
  }
}
