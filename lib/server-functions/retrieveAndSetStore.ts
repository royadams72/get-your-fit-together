import { Cookie, CookieAction } from "@/types/enums/cookie.enum";

import { RootState } from "@/types/interfaces/store";
import { FitPlan } from "@/types/interfaces/fitness-plan";
import { isRedirectResponse } from "@/types/guards/isRedirectResponse";
import { ResponseObj } from "@/types/interfaces/api";

import cookieAction from "@/lib/actions/cookie.action";
import { getStateFromRedis } from "@/lib/server-functions/getStateFromRedis";
import { getPlanFromDB } from "@/lib/server-functions/getPlanFromDB";
import { createPlan } from "@/lib/server-functions/createPlan";

export default async function retrieveAndSetStore() {
  let savedState: RootState | ResponseObj | undefined;

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
    savedState = await getStateFromRedis(sessionCookie);

    if (isRedirectResponse(savedState as { redirect: boolean })) {
      return savedState;
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
      const retrievedState = await getPlanFromDB({
        userName,
        userPassword,
      });

      if (
        isRedirectResponse(retrievedState as unknown as { redirect: boolean })
      )
        return retrievedState;

      // const { uiData, journey } = savedState as RootState;
      savedState = {
        ...(savedState as RootState),
        ...(retrievedState as Partial<RootState>),
      };
    }

    if (!isRetrieving && isEditing) {
      const fitnessPlanFromAI = await createPlan(savedState as RootState);

      if (
        isRedirectResponse(
          fitnessPlanFromAI as unknown as { redirect: boolean }
        )
      )
        return fitnessPlanFromAI;

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
    console.error("An error occurred in retrieveAndSetStore:", error);
  }
  console.log(savedState);

  return savedState;
}
