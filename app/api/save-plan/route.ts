import { NextResponse } from "next/server";
import { State } from "@/types/interfaces/store";
import { connectToDB } from "@/lib/db/mongodb";
// import { extractState } from "../get-plan/route";

export async function POST(req: Request) {
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");

    // console.log("await req.json()::", await req.json());
    const { savedState } = await req.json();

    const { uiData, journey, ...stateToSave }: State = savedState;

    const {
      user: {
        user: { userPassword },
      },
    } = stateToSave;
    console.log(stateToSave, "userPassword:::", userPassword);

    await collection.updateOne(
      { userPassword },
      {
        $set: { userPassword, stateToSave },
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
