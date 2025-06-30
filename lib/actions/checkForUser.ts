"use server";

import { connectToDB } from "@/lib/db/mongodb";
import { DbResponse } from "@/types/interfaces/response";
import { ResponseType } from "@/types/enums/response.enum";
import { response } from "@/lib/services/response.service";
import { verifySession } from "./verifySession";

export async function checkForUser(userName: string) {
  try {
    // throw new Error("CheckUser: ");
    await verifySession(false);
    const db = await connectToDB();
    const collection = db.collection("reduxStates");
    const plan: DbResponse | null = await collection.findOne<DbResponse | null>(
      {
        "reduxState.user.user.userName": userName,
      }
    );

    if (plan) {
      return response(
        "A fitness plan already exists with that user name",
        ResponseType.redirect,
        true,
        true
      );
    } else {
      return response("No plan with that user name");
    }
  } catch (error) {
    return response(
      `Database error: ${error}`,
      ResponseType.redirect,
      true,
      true
    );
  }
}
