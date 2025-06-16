import { createListenerMiddleware } from "@reduxjs/toolkit";
import { API } from "@/routes.config";
import { JourneyData } from "@/types/interfaces/journey";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const saveDataToRedis = createListenerMiddleware();

saveDataToRedis.startListening({
  predicate: (action, currState: any, prevState: any) => {
    if (currState !== prevState && action.type === "journey/navigate") {
      // const pagesComplete = currState.journey.journey.journeyData.reduce(
      //   (acc: number, route: JourneyData) =>
      //     route.isComplete === true ? acc++ : acc
      // );
      // const journeyData = currState.journey.journey.journeyData;
      const journeyData = currState.uiData.uiData;
      console.log("saveDataToRedis::", journeyData);

      // let pagesComplete = 0;

      return true;
    }
    return false;
  },

  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as any;
    console.log("saveDataToRedis::", action, BASE_URL, API.SET_REDIS);

    try {
      const res = await fetch(`${BASE_URL}/${API.SET_REDIS}`, {
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
