import { NextResponse } from "next/server";
import { State } from "@/types/interfaces/store";
import { connectToDB } from "@/lib/db/mongodb";
import { PersistPartial } from "redux-persist/es/persistReducer";
// import { extractState } from "../get-plan/route";

export async function POST(req: Request) {
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");
    const { savedState } = await req.json();

    const { _persist, uiData, journey, ...reduxState }: State & PersistPartial =
      savedState;

    const {
      user: {
        user: { userName, userPassword },
      },
    } = reduxState;
    console.log(reduxState);

    // TODO: check if userName and userPassword are not empty
    await collection.updateOne(
      {
        "reduxState.user.user.userName": userName,
        "reduxState.user.user.userPassword": userPassword,
      },
      {
        $set: { reduxState },
        $setOnInsert: { createdAt: new Date() },
        $currentDate: { updatedAt: true },
      },
      { upsert: true }
    );
    // TODO: check response

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to save state" },
      { status: 500 }
    );
  }
}
