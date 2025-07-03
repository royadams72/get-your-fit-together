import { createListenerMiddleware } from "@reduxjs/toolkit";
import { Storage } from "@/types/enums/cookie.enum";
import { PATHS } from "@/routes.config";

import { saveStateToRedis } from "@/lib/actions/saveStateToRedis";
import { writeError } from "@/lib/actions/writeError";

const persistStoreClientSide = (state: any) => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem(Storage.reduxStore, serializedState);
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  }
};

export const saveDataToRedis = createListenerMiddleware();
saveDataToRedis.startListening({
  predicate: (action, currState: any, prevState: any) => {
    if (
      (currState !== prevState && action.type === "journey/navigate") ||
      action.type.includes("preferences/") ||
      action.type.includes("uiData/") ||
      (currState.user !== prevState.user && action.type.includes("user/")) ||
      (currState.journey !== prevState.journey &&
        action.type === "journey/setCanNavigateTrue") ||
      action.type === "uiData/asyncSetCanNavigateTrue" ||
      action.type === "uiData/asyncSetUiDataForRetreive" ||
      action.type === "user/asyncSetUserInfo"
    ) {
      persistStoreClientSide(currState);
      return true;
    }
    return false;
  },

  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as any;
    try {
      console.log("Redux middleware::", state);
      const res = await saveStateToRedis(state);

      if (!res || res.redirect) {
        throw new Error(res.message || "Unknown error");
      }
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : error instanceof Error
          ? error.message
          : "There was an error persist middleware";
      await writeError(message);
      window.location.href = PATHS.ERROR;
    }
  },
});
