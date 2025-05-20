import { NextResponse } from "next/server";
import { State } from "@/types/interfaces/store";
import { connectToDB } from "@/lib/db/mongodb";
import { PersistPartial } from "redux-persist/es/persistReducer";

export async function POST(req: Request) {
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");

    const { savedState, userData } = await req.json();

    console.log("savedState", savedState);

    const {
      _persist,
      uiData,
      journey,
      ...restOfState
    }: State & PersistPartial = savedState;

    const userName = userData?.userName || restOfState?.user?.user?.userName;
    const userPassword =
      userData?.userName || restOfState?.user?.user?.userPassword;

    if (!userName || !userPassword) {
      return NextResponse.json(
        { error: "User name and password are required" },
        { status: 400 }
      );
    }

    const reduxState = {
      ...restOfState,
      user: { user: { ...restOfState.user.user, userPassword, userName } },
    };

    try {
      const response = await collection.updateOne(
        {
          "reduxState.user.user.userName": userName,
        },
        {
          $set: {
            reduxState: reduxState,
          },
          $setOnInsert: {
            createdAt: new Date(),
          },
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
