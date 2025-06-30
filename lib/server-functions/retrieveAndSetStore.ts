import { RootState, State } from "@/types/interfaces/store";
import { FitPlan } from "@/types/interfaces/fitness-plan";
import { isRedirectResponse } from "@/types/guards/isRedirectResponse";
import { DbResponse, ResponseObj } from "@/types/interfaces/response";

import { getPlanFromDB } from "@/lib/server-functions/getPlanFromDB";
import { createPlan } from "@/lib/server-functions/createPlan";
import { verifySession } from "@/lib/actions/verifySession";
import { isDbResponse } from "@/types/guards/isDbResponse";
import { setRedisUser } from "../actions/setRedisUser";
import { response } from "../services/response.service";
import { ResponseType } from "@/types/enums/response.enum";
import { redirectOnError } from "../utils/redirectOnError";
import { AppError } from "../utils/appError";

export default async function retrieveAndSetStore() {
  let savedState: RootState | ResponseObj | Partial<DbResponse> | undefined;

  try {
    const sessionResult = await verifySession(false);
    // console.log("sessionResult::", sessionResult);

    // if (isRedirectResponse(savedState)) {
    //   return savedState;
    // }
    if (!sessionResult || !sessionResult.userSessionState) {
      return { message: "No user details found", redirect: true };
    }
    const { userSessionState } = sessionResult;
    // console.log("userSessionState:::", userSessionState);
    savedState = userSessionState;

    const {
      user: {
        user: { userName, userPassword },
      },
      uiData: {
        uiData: { isRetrieving, isEditing },
      },
    } = savedState as RootState;

    // Retrieve full state if needed
    if (userName && userPassword && isRetrieving) {
      const retrievedState:
        | Partial<DbResponse>
        | { redirect: boolean }
        | ResponseObj = await getPlanFromDB({
        userName,
        userPassword,
      });

      // if (isRedirectResponse(retrievedState)) return retrievedState;

      if ("reduxState" in retrievedState) {
        console.log("retrievedState::", retrievedState.reduxState);
      }

      if (isDbResponse(retrievedState)) {
        const { reduxState, _id } = retrievedState;

        const {
          uiData: {
            uiData: { sessionId },
          },
        } = savedState as State;

        setRedisUser(sessionId as string, _id);

        savedState = {
          ...(savedState as RootState),
          ...(reduxState as Partial<RootState>),
        };
      } else {
        return {
          redirect: true,
        };
      }
      // const { uiData, journey } = savedState as RootState;
    }
    // console.log("isRetrieving && isEditing", savedState);

    if (!isRetrieving && isEditing) {
      const fitnessPlanFromAI = await createPlan(savedState as RootState);
      // console.log("fitnessPlanFromAI", fitnessPlanFromAI);
      // if (isRedirectResponse(fitnessPlanFromAI)) return fitnessPlanFromAI;
      // await redirectOnError(fitnessPlanFromAI);
      if (
        savedState &&
        typeof savedState === "object" &&
        "user" in savedState &&
        savedState.user &&
        "user" in savedState.user &&
        savedState.user.user
      ) {
        savedState.user.user.userFitnessPlan = fitnessPlanFromAI as FitPlan;
      }
    }
  } catch (error) {
    // console.error("An error occurred in retrieveAndSetStore:", error);
    let result: ResponseObj = {};
    if (error instanceof AppError) {
      console.log("error instanceof AppError::", error instanceof AppError);

      result = {
        redirect: error.action === ResponseType.redirect,
        softError: error.action === ResponseType.softError,
        message: error.message,
      };
    } else {
      result = {
        redirect: true,
        message: `Unexpected error: ${error}`,
      };
    }

    await redirectOnError(result);
    // return response(
    //   `An error occurred in retrieveAndSetStore: ${error}`,
    //   ResponseType.redirect
    // );
  }
  console.log(savedState);

  return savedState;
}
