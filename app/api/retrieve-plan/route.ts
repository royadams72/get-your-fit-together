import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongodb";
import { DbResponse } from "@/types/interfaces/api";
import { isDbResponse } from "@/types/guards/db-response";
import { ApiError } from "@/lib/services/ApiError";
import { handleApiError } from "@/lib/services/handleApiError";
import { mapErrorResponse } from "@/lib/services/mapError";

export async function POST(req: Request) {
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");

    const { userPassword, userName } = await req.json();

    const plan: DbResponse | null = await collection.findOne<DbResponse | null>(
      {
        "reduxState.user.user.userName": userName,
        "reduxState.user.user.userPassword": userPassword,
      }
    );
    console.log("userName:", userName, "password:", userPassword);
    // console.log("plan:", plan);

    if (!plan) {
      const { errObject, responseOptions } = mapErrorResponse(
        "A plan with that user name and password combination was not found",
        404,
        true
      );
      console.log("mapErrorResponse:", errObject, { status: 404 });

      return NextResponse.json(errObject, responseOptions);
    }

    if (isDbResponse(plan)) {
      const { reduxState } = plan;
      return NextResponse.json(reduxState, { status: 200 });
    } else {
      return NextResponse.json(
        {
          error:
            "AI returned an unexpected structure, so your plan could not be retrieved",
          ignore: false,
        },
        { status: 502 }
      );
    }
  } catch (error) {
    return handleApiError(error);
  }
}
