import { API } from "@/routes.config";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
import { ENV } from "@/lib/services/envService";
import { fetchHelper } from "@/lib/utils/fetchHelper";
import cookieAction from "@/lib/actions/cookie.action";
import { RootState } from "@/types/interfaces/store";
import { isRedirectResponse } from "@/types/guards/isRedirectResponse";
import { ErrorObj } from "@/types/interfaces/api";

export default async function retrieveAndSetStore() {
  let savedState: RootState | ErrorObj | undefined;

  let sessionCookie = await cookieAction(CookieAction.get, [
    Cookie.sessionCookie,
  ]);
  let retries = 3;

  while (!sessionCookie && retries > 0) {
    if (!sessionCookie) {
      await new Promise((res) => setTimeout(res, 100));
      sessionCookie = await cookieAction(CookieAction.get, [
        Cookie.sessionCookie,
      ]);
      retries--;
    }
  }

  if (!sessionCookie) {
    console.warn(
      "No session cookie found after retries — skipping store retrieval."
    );
    return undefined;
  }

  try {
    savedState = await fetchHelper(
      `${ENV.BASE_URL}/${API.GET_REDIS}`,
      {},
      "GET",
      `sessionCookie=${sessionCookie}`
    );

    if (isRedirectResponse(savedState)) return savedState;

    if (!savedState || typeof savedState !== "object") {
      console.warn("Empty or invalid savedState received from Redis.");
      return undefined;
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
      const retrievedState = await fetchHelper(
        `${ENV.BASE_URL}/${API.RETRIEVE}`,
        {
          userName,
          userPassword,
        }
      );

      if (isRedirectResponse(retrievedState)) return retrievedState;

      const { uiData, journey } = savedState as RootState;
      savedState = { ...retrievedState, uiData, journey };
    }

    if (!isRetrieving && isEditing) {
      const fitnessPlanFromAI = await fetchHelper(
        `${ENV.BASE_URL}/${API.GET_PLAN}`,
        savedState
      );

      if (isRedirectResponse(fitnessPlanFromAI)) return fitnessPlanFromAI;

      if (
        savedState &&
        typeof savedState === "object" &&
        "user" in savedState &&
        savedState.user &&
        "user" in savedState.user &&
        savedState.user.user
      ) {
        savedState.user.user.userFitnessPlan = fitnessPlanFromAI;
      }
    }
  } catch (error) {
    console.error("An error occurred in retrieveAndSetStore:", error);
  }

  return savedState;
}
