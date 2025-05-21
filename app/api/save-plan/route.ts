import { NextResponse } from "next/server";

import { State } from "@/types/interfaces/store";
import { PersistPartial } from "redux-persist/es/persistReducer";

import { connectToDB } from "@/lib/db/mongodb";
import { handleApiError } from "@/lib/services/handleApiError";
import { ApiError } from "@/lib/services/ApiError";

const extractUserInfoAndState = async (
  savedState: State & PersistPartial,
  userData: { userName: string; userPassword: string }
) => {
  const { _persist, uiData, journey, ...restOfState } = savedState;

  const userName = userData?.userName || restOfState?.user?.user?.userName;
  const userPassword =
    userData?.userPassword || restOfState?.user?.user?.userPassword;
  return { userName, userPassword, restOfState };
};

export async function POST(req: Request) {
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");
    const { savedState, userData } = await req.json();

    const { userName, userPassword, restOfState } =
      await extractUserInfoAndState(savedState, userData);

    if (!userName || !userPassword) {
      throw new ApiError("User name and password are required", 401);
    }

    const reduxState = {
      ...restOfState,
      user: { user: { ...restOfState.user.user, userPassword, userName } },
    };

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

    if (response.matchedCount === 0 && response.upsertedCount === 0) {
      throw new ApiError(
        "There was a problem, your plan could not be saved, please try again later",
        409
      );
    } else if (response.matchedCount === 1 && response.modifiedCount === 0) {
      throw new ApiError(
        "There was a problem, updates could not be saved to your plan, please try again later",
        409
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return handleApiError(error);
  }
}
