import { API } from "@/routes.config";

import { ENV } from "../services/envService";
import { fetchHelper } from "./fetchHelper";
import { RootState } from "@/types/interfaces/store";

export default async function retrieveAndSetStore() {
  let savedState: any;
  try {
    savedState = await fetchHelper(
      `${ENV.BASE_URL}/${API.GET_REDIS}`,
      {},
      "GET"
    );

    // console.log("retrieveAndSetStore savedState:", savedState);
    // savedState = await data.json()
    // const {
    //   user: {
    //     user: { userName, userPassword },
    //   },
    //   uiData: {
    //     uiData: { isRetrieving, isEditing },
    //   },
    // } = savedState as RootState;

    // console.log(
    //   "userName && userPassword && isRetrieving",
    //   userName && userPassword && isRetrieving,
    //   { userName, userPassword },
    //   { isRetrieving, isEditing }
    // );
    // if (userName && userPassword && isRetrieving) {
    //   savedState = await fetchHelper(`${ENV.BASE_URL}/${API.RETRIEVE}`, {
    //     userName,
    //     userPassword,
    //   });
    // }

    // if (!isRetrieving && isEditing) {
    //   console.log("retrieveAndSetStore isEditing::", isEditing);
    //   // Get fitplan and add to saved data
    //   const fitnessPlanFromAI = await fetchHelper(
    //     `${ENV.BASE_URL}/${API.GET_PLAN}`,
    //     savedState
    //   );

    //   savedState.user.user.userFitnessPlan = fitnessPlanFromAI;
    // }
  } catch (error) {
    console.error("An error occured:", error);
  }
  // TODO: What to return if error
  // console.log("retrieveAndSetStore savedState:", savedState);

  return savedState;
}
