"use server";

import { connectToDB } from "@/lib/db/mongodb";
import { DbResponse } from "@/types/interfaces/api";
import { response, ResponseType } from "../services/response.service";

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
      return await response(
        "A fitness plan already exists with that user name",
        ResponseType.softError
      );
    } else {
      return response("No plan with that user name");
    }
  } catch (error) {
    return response(
      `Any unexpected error occurred: ${error}`,
      ResponseType.redirect
    );
  }
}
