import { createListenerMiddleware } from "@reduxjs/toolkit";
import { saveStateToRedis } from "../actions/saveStateToRedis";
import { response } from "../services/response.service";
import { ResponseType } from "@/types/enums/response.enum";
import { AppError } from "../utils/appError";
import { redirectOnError } from "../server-functions/redirectOnError";
import { writeError } from "../actions/writeError";
import { PATHS } from "@/routes.config";

const persistStoreClientSide = (state: any) => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem("redux-store", serializedState);
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
        action.type === "journey/setCanNavigateTrue")
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
