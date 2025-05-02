import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongodb";
import { DbResponse } from "@/types/interfaces/api";

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
    if (plan) {
      const { reduxState } = plan;

      return NextResponse.json(reduxState, { status: 200 });
    } else {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to save state" },
      { status: 500 }
    );
  }
}
