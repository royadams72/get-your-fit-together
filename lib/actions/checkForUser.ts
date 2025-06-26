"use server";

import { connectToDB } from "@/lib/db/mongodb";
import { DbResponse } from "@/types/interfaces/api";
import { response } from "../services/response.service";
// import { errorResponse } from "@/lib/services/errorResponse";

export async function checkForUser(userName: string) {
  try {
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
        true
      );
    } else {
      return response("No plan with that user name");
    }
  } catch (error) {
    return response(`Any unexpected error occurred: ${error}`, true);
  }
}
