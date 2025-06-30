import { connectToDB } from "@/lib/db/mongodb";

import { DbResponse } from "@/types/interfaces/response";
import { isDbResponse } from "@/types/guards/isDbResponse";
import { ResponseType } from "@/types/enums/response.enum";
import { isEmpty } from "@/lib/utils/isEmpty";
import { UserFormType } from "@/types/interfaces/form";

import { response } from "@/lib/services/response.service";
import { verifySession } from "../actions/verifySession";

export async function getPlanFromDB(userData: UserFormType) {
  try {
    await verifySession(false);

    const db = await connectToDB();
    const collection = db.collection("reduxStates");

    if (isEmpty(userData)) {
      return response(
        "No data was recieved from the form, please try again",
        ResponseType.softError
      );
    }

    const userName = userData.userName || undefined;
    const userPassword = userData.userPassword || undefined;

    const documentFilter = {
      "reduxState.user.user.userName": userName,
      "reduxState.user.user.userPassword": userPassword,
    };

    const plan: DbResponse | null = await collection.findOne<DbResponse | null>(
      documentFilter
    );

    if (!plan) {
      return response(
        "A plan with that user name and password combination was not found",
        ResponseType.softError
      );
    }

    if (isDbResponse(plan)) {
      const { reduxState, _id } = plan;

      return { reduxState, _id };
    } else {
      throw new Error(
        "An unexpected structure was returned, so your plan could not be retrieved"
      );
    }
  } catch (error) {
    return response(`DB error: ${error}`, ResponseType.redirect);
  }
}
