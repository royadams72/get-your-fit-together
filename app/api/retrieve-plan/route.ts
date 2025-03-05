import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongodb";
import { RootState } from "@/lib/store/store";

export async function POST(req: Request) {
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");

    const { userPassword } = await req.json();
    // const {
    //   user: {
    //     user: { userPassword },
    //   },
    // } = savedState;

    const plan = await collection.findOne({ userPassword });
    console.log(plan);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to save state" },
      { status: 500 }
    );
  }
}
