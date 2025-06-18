import { API } from "@/routes.config";

import { ENV } from "../services/envService";
import { fetchHelper } from "./fetchHelper";
import { RootState } from "@/types/interfaces/store";
import cookieAction from "./cookie.action";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";

export default async function retrieveAndSetStore() {
  // GET GYFTapp:sessionCookie:9edbf5ce-4f83-4108-8134-c67955de6e98
  let savedState: any;
  const sessionCookie = await cookieAction(CookieAction.get, [
    Cookie.sessionCookie,
  ]);
  try {
    savedState = await fetchHelper(
      `${ENV.BASE_URL}/${API.GET_REDIS}`,
      {},
      "GET",
      `sessionCookie=${sessionCookie}`
    );

    console.log("retrieveAndSetStore savedState:", savedState);
    const {
      user: {
        user: { userName, userPassword },
      },
      uiData: {
        uiData: { isRetrieving, isEditing },
      },
    } = savedState as RootState;

    // console.log(
    //   "userName && userPassword && isRetrieving",
    //   userName && userPassword && isRetrieving,
    //   { userName, userPassword },
    //   { isRetrieving, isEditing }
    // );
    if (userName && userPassword && isRetrieving) {
      const retrievedState = await fetchHelper(
        `${ENV.BASE_URL}/${API.RETRIEVE}`,
        {
          userName,
          userPassword,
        }
      );

      const { uiData } = savedState;
      savedState = {};
      savedState = { ...retrievedState, uiData };
    }

    if (!isRetrieving && isEditing) {
      console.log("retrieveAndSetStore isEditing::", isEditing);
      // Get fitplan and add to saved data
      const fitnessPlanFromAI = await fetchHelper(
        `${ENV.BASE_URL}/${API.GET_PLAN}`,
        savedState
      );

      savedState.user.user.userFitnessPlan = fitnessPlanFromAI;
    }
  } catch (error) {
    console.error("An error occured:", error);
  }
  // TODO: What to return if error
  console.log("retrieveAndSetStore savedState:", savedState);

  return savedState;
}
