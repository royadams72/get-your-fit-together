import { API } from "@/routes.config";

import { ENV } from "../services/envService";
import { fetchHelper } from "./fetchHelper";
import { RootState } from "@/types/interfaces/store";

export default async function retrieveAndSetStore() {
  const data = await fetch(`${ENV.BASE_URL}/${API.GET_REDIS}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const savedState = await data.json();
  // const state = JSON.parse(savedState);
  const {
    preferences: { preferences },
    uiData: {
      uiData: { isRetrieving, isEditing },
    },
  } = savedState as RootState;
  console.log("!isRetrieving && isEditing::", !isRetrieving && isEditing);

  if (!isRetrieving && isEditing) {
    console.log("retrieveAndSetStore isEditing::", isEditing);
    // Get fitplan and add to saved data
    const fitnessPlanFromAI = await fetchHelper(
      `${ENV.BASE_URL}/${API.GET_PLAN}`,
      savedState
    );

    savedState.user.user.userFitnessPlan = fitnessPlanFromAI;
  }

  return savedState;
}
