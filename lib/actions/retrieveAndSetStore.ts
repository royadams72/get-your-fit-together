import { API } from "@/routes.config";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
import { ENV } from "@/lib/services/envService";
import { fetchHelper } from "@/lib/utils/fetchHelper";
import cookieAction from "@/lib/actions/cookie.action";
import { RootState } from "@/types/interfaces/store";

export default async function retrieveAndSetStore() {
  let savedState: RootState | undefined;

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

    if (!savedState || typeof savedState !== "object") {
      console.warn("Empty or invalid savedState received from Redis.");
      return undefined;
    }

    const user = savedState?.user?.user || {};
    const ui = savedState?.uiData?.uiData || {};
    const { userName, userPassword } = user;
    const { isRetrieving, isEditing } = ui;
    console.log(
      "retrieveAndSetStore userName && userPassword && isRetrievin:",
      userName,
      userPassword,
      isRetrieving
    );
    // Retrieve full state if needed
    if (userName && userPassword && isRetrieving) {
      const retrievedState = await fetchHelper(
        `${ENV.BASE_URL}/${API.RETRIEVE}`,
        {
          userName,
          userPassword,
        }
      );

      const { uiData, journey } = savedState;
      savedState = { ...retrievedState, uiData, journey };
    }

    if (!isRetrieving && isEditing) {
      // console.log("retrieveAndSetStore isEditing:", isEditing);
      const fitnessPlanFromAI = await fetchHelper(
        `${ENV.BASE_URL}/${API.GET_PLAN}`,
        savedState
      );
      if (savedState && savedState.user && savedState.user.user) {
        savedState.user.user.userFitnessPlan = fitnessPlanFromAI;
      }
    }
  } catch (error) {
    console.error("An error occurred in retrieveAndSetStore:", error);
  }

  return savedState;
}
