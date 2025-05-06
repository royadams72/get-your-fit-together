import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongodb";
import { DbResponse } from "@/types/interfaces/api";
import { isDbResponse } from "@/types/guards/db-response";

export async function POST(req: Request) {
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");

    const { userPassword, userName } = await req.json();
    console.log("userName", userName, "userPassword", userPassword);

    const plan: DbResponse | null = await collection.findOne<DbResponse | null>(
      {
        "reduxState.user.user.userName": userName,
        "reduxState.user.user.userPassword": userPassword,
      }
    );
    // Check if user was found
    if (!plan) {
      return NextResponse.json(
        { error: "Username or password is incorrect." },
        { status: 404 }
      );
    }

    // Check plan has the correct formatting
    if (isDbResponse(plan)) {
      const { reduxState } = plan;

      return NextResponse.json(reduxState, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "There is data missing from your plan." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: `Database error: ${error}` },
      { status: 500 }
    );
  }
}
