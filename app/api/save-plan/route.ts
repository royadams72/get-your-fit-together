import { NextResponse } from "next/server";
import { State } from "@/types/interfaces/store";
import { connectToDB } from "@/lib/db/mongodb";

export async function POST(req: Request) {
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");

    const { savedState } = await req.json();
    const {
      user: {
        user: { userPassword },
      },
    }: State = savedState;

    await collection.updateOne(
      { userPassword },
      {
        $set: { userPassword, savedState },
        $setOnInsert: { createdAt: new Date() },
        $currentDate: { updatedAt: true },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to save state" },
      { status: 500 }
    );
  }
}
