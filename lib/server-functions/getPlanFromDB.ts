import { connectToDB } from "@/lib/db/mongodb";

import { DbResponse } from "@/types/interfaces/response";
import { isStoreInDbResponse } from "@/types/guards/isStoreInDbResponse";
import { ResponseType } from "@/types/enums/response.enum";
import { isEmpty } from "@/lib/utils/isEmpty";
import { UserFormType } from "@/types/interfaces/form";

import { response } from "@/lib/services/response.service";
import { verifySession } from "../actions/verifySession";
import bcrypt from "bcryptjs";

export async function getPlanFromDB(userData: UserFormType) {
  try {
    await verifySession();

    const db = await connectToDB();
    const collection = db.collection("reduxStates");

    if (isEmpty(userData)) {
      return response(
        "No data was recieved from the form, please try again",
        ResponseType.softError
      );
    }

    const userName = userData.userName || undefined;
    const inputPassword = userData.userPassword || undefined;

    const documentFilter = {
      "reduxState.user.user.userName": userName,
    };

    const plan: DbResponse | null = await collection.findOne<DbResponse | null>(
      documentFilter
    );

    if (!plan) {
      return response(
        "A plan with that user name was not found",
        ResponseType.softError
      );
    }

    if (isStoreInDbResponse(plan)) {
      const { reduxState, _id } = plan;
      const isMatch = bcrypt.compareSync(
        inputPassword as string,
        reduxState.user.user.userPassword
      );
      console.log("for DB:::::", reduxState.user.user.userPassword);

      console.log(
        "isStoreInDbResponse::",
        reduxState.user.user.userPassword,
        inputPassword
      );
      console.log("isMatch::", isMatch);
      if (!isMatch) {
        return response(
          "A plan with that password was not found",
          ResponseType.redirect
        );
      }

      return { reduxState, _id };
    } else {
      throw new Error(
        "An unexpected structure was returned, so your plan could not be retrieved"
      );
    }
  } catch (error) {
    return response(`DB error ${error}`, ResponseType.redirect);
  }
}
