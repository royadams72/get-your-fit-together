import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongodb";

export async function POST(req: Request) {
  try {
    const db = await connectToDB(); // Now `db` is a `Db` instance
    const collection = db.collection("reduxStates"); // ✅ This will now work

    const { savedState } = await req.json();
    const {
      user: {
        user: { userPassword },
      },
    } = savedState;

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
