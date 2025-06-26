import { createListenerMiddleware } from "@reduxjs/toolkit";
import { API } from "@/routes.config";

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
      const res = await fetch(API.SET_REDIS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state }),
        credentials: "include",
      });

      if (!res.ok) {
        console.error(`HTTP error! Status: ${res.status}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (error) {
      Response.json(`There was an error persist middleware: ${error}`, {
        status: 500,
      });
    }
  },
});
