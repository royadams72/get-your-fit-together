"use server";
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongodb";
import { DbResponse } from "@/types/interfaces/api";
import { errorResponse } from "@/lib/services/errorResponse";

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
      return { message: "A fitness plan already exists with that user name" };
    } else {
      return { message: "No plan with that user name" };
    }
  } catch (error) {
    console.error(`Any unexpected error occurred: ${error}`);
  }
}
