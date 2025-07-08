import { RootState } from "@/types/interfaces/store";
import { FitPlan } from "@/types/interfaces/fitness-plan";
import { DbResponse, ResponseObj } from "@/types/interfaces/response";
import { isStoreInDbResponse } from "@/types/guards/isStoreInDbResponse";
import { ResponseType } from "@/types/enums/response.enum";
import { SessionMeta } from "@/types/interfaces/redis";

import { getPlanFromDB } from "@/lib/server-functions/getPlanFromDB";
import { createPlan } from "@/lib/server-functions/createPlan/createPlan";
import { verifySession } from "@/lib/actions/verifySession";
import { redirectOnError } from "@/lib/server-functions/redirectOnError";
import { setRedisUser } from "@/lib/actions/setRedisUser";
import { AppError } from "@/lib/utils/appError";

export default async function retrieveAndSetStore() {
  let savedState: RootState | ResponseObj | Partial<DbResponse> | undefined;

  try {
    const sessionResult = await verifySession(true);

    let userSessionState: RootState | undefined;
    let sessionMeta: SessionMeta | undefined;

    if (
      sessionResult &&
      "userSessionState" in sessionResult &&
      "sessionMeta" in sessionResult
    ) {
      userSessionState = sessionResult.userSessionState as RootState;
      sessionMeta = sessionResult.sessionMeta;
    }
    savedState = userSessionState;

    if (!savedState) {
      throw new AppError("No saved state found", ResponseType.redirect);
    }

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
      const dbResponse: Partial<DbResponse> | ResponseObj = await getPlanFromDB(
        {
          userName,
          userPassword,
        }
      );

      if (isStoreInDbResponse(dbResponse)) {
        const { reduxState, _id } = dbResponse;

        const sessionId = sessionMeta?.sessionId;

        setRedisUser(sessionId as string, _id);

        savedState = {
          ...(savedState as RootState),
          ...(reduxState as Partial<RootState>),
        };
      } else {
        await redirectOnError(dbResponse);
      }
    }

    if (!isRetrieving && isEditing) {
      const fitnessPlanFromAI = await createPlan(savedState as RootState);
      if (
        savedState &&
        typeof savedState === "object" &&
        "user" in savedState &&
        savedState.user &&
        "user" in savedState.user &&
        savedState?.user?.user
      ) {
        if (savedState.user && savedState.user.user) {
          savedState.user.user.userFitnessPlan = fitnessPlanFromAI as FitPlan;
        }
      }
    }
  } catch (error) {
    let result: ResponseObj = {};
    if (error instanceof AppError) {
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
  }

  return savedState;
}
