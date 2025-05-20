import { NextResponse } from "next/server";
import { State } from "@/types/interfaces/store";
import { connectToDB } from "@/lib/db/mongodb";
import { PersistPartial } from "redux-persist/es/persistReducer";
// import { extractState } from "../get-plan/route";

export async function POST(req: Request) {
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");
    const { savedState, userData } = await req.json();

    const { _persist, uiData, journey, ...reduxState }: State & PersistPartial =
      savedState;

    const { userName, userPassword } = userData;
    console.log(userData);

    if (!userName || !userPassword) {
      return NextResponse.json(
        { error: "User name and password are required" },
        { status: 400 }
      );
    }

    try {
      const response = await collection.updateOne(
        {
          "reduxState.user.user.userName": userName,
        },
        {
          $set: {
            "reduxState.user.user.userName": userName,
            "reduxState.user.user.userPassword": userPassword,
            reduxState: reduxState,
          },
          $setOnInsert: { createdAt: new Date() },
          $currentDate: { updatedAt: true },
        },
        { upsert: true }
      );

      if (!response) {
        return NextResponse.json(
          { error: "Failed to save state" },
          { status: 500 }
        );
      }
      console.log("response", response);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error saving state:", error);
      return NextResponse.json(
        { error: "Failed to save state" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to save state" },
      { status: 500 }
    );
  }
}
