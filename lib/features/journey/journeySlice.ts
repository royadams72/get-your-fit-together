import { createAppSlice } from "@/lib/store/createAppSlice";
import { JOURNEY_PATHS } from "@/routes.config";
import { JourneyState, JourneyStore } from "@/types/interfaces/journey";
import { PayloadAction } from "@reduxjs/toolkit/react";

export const journeySliceName = "journey";

const setJourneyPaths = () => {
  return JOURNEY_PATHS.map((name, i) => {
    return { name, isComplete: false, canNavigate: i === 0 ? true : false };
  });
};

export const journeyInitialState: JourneyState = {
  journey: {
    journeyData: setJourneyPaths(),
    routes: {
      currentRoute: JOURNEY_PATHS[0],
      nextRoute: JOURNEY_PATHS[1],
      prevRoute: "",
    },
  },
};

export const journeySlice = createAppSlice({
  name: journeySliceName,
  initialState: journeyInitialState,
  reducers: {
    setJourney: <K extends keyof JourneyStore>(
      state: JourneyState,
      action: { payload: { name: K; value: JourneyStore[K] } }
    ) => {
      state.journey[action.payload.name] = action.payload.value;
    },
    navigate: (
      state,
      action: PayloadAction<{ route: string; isFormSubmit?: boolean }>
    ) => {
      const currentIndex = setRoutes(state, action);
      console.log("currentIndex:", currentIndex);

      if (action?.payload?.isFormSubmit) {
        state.journey.journeyData[currentIndex].isComplete = true;
        state.journey.journeyData[currentIndex + 1].canNavigate = true;
      }
    },
    setCanNavigateTrue: (state) => {
      state.journey.journeyData.map((route) => (route.canNavigate = true));
    },
  },
  selectors: {
    getRoutes: (state: JourneyState) => state.journey.routes,
    getJourneyData: (state: JourneyState) => state.journey.journeyData,
  },
});

export const { setJourney, navigate, setCanNavigateTrue } =
  journeySlice.actions;
export const journeyReducer = journeySlice.reducer;
export const { getRoutes, getJourneyData } = journeySlice.selectors;
// Utils
const setRoutes = (
  state: JourneyState,
  action: PayloadAction<{ route: string }>
) => {
  state.journey.routes.currentRoute = action.payload.route;
  let currentIndex = JOURNEY_PATHS.findIndex(
    (route) => route === state.journey.routes.currentRoute
  );

  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= JOURNEY_PATHS.length)
    currentIndex = JOURNEY_PATHS.length - 1;

  state.journey.routes.prevRoute =
    currentIndex > 0 ? JOURNEY_PATHS[currentIndex - 1] : "";

  state.journey.routes.nextRoute =
    currentIndex < JOURNEY_PATHS.length - 1
      ? JOURNEY_PATHS[currentIndex + 1]
      : "";

  return currentIndex;
};
