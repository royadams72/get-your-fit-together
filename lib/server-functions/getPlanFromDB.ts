import { connectToDB } from "@/lib/db/mongodb";

import { DbResponse } from "@/types/interfaces/api";
import { isDbResponse } from "@/types/guards/db-response";
import { ResponseType } from "@/types/enums/response.enum";
import { isEmpty } from "@/lib/utils/isEmpty";
import { UserFormType } from "@/types/interfaces/form";

import { response } from "@/lib/services/response.service";

export async function getPlanFromDB(userData: UserFormType) {
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");

    if (isEmpty(userData)) {
      return await response(
        "No data recieved data was recieved from the form, please try again",
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
      return await response(
        "A plan with that user name and password combination was not found",
        ResponseType.softError
      );
    }

    if (isDbResponse(plan)) {
      const { reduxState } = plan;

      return reduxState;
    } else {
      return await response(
        "AI returned an unexpected structure, so your plan could not be retrieved",
        ResponseType.redirect
      );
    }
  } catch (error) {
    return await response(
      `There was an unexpected error: ${error}`,
      ResponseType.redirect
    );
  }
}
