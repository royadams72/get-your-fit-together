import { API } from "@/routes.config";

import { ENV } from "../services/envService";
import { fetchHelper } from "./fetchHelper";
import { RootState } from "@/types/interfaces/store";

export default async function retrieveAndSetStore() {
  let savedState: any;
  try {
    const data = await fetch(`${ENV.BASE_URL}/${API.GET_REDIS}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    savedState = await data.json();
    console.log("retrieveAndSetStore savedState:", savedState);

    const {
      uiData: {
        uiData: { isRetrieving, isEditing },
      },
    } = savedState as RootState;

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
  return savedState;
}
