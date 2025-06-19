import {
  combineReducers,
  configureStore,
  createAction,
  createSelector,
} from "@reduxjs/toolkit";

import { RootState, State } from "@/types/interfaces/store";

import {
  aboutYouInitialState,
  aboutYouReducer,
} from "@/lib/features/about-you/aboutYouSlice";
import {
  yourGoalsInitialState,
  yourGoalsReducer,
} from "@/lib/features/your-goals/yourGoalsSlice";
import {
  injuriesInitialState,
  injuriesReducer,
} from "@/lib/features/injuries/injuriesSlice";
import {
  preferencesInitialState,
  preferencesReducer,
} from "@/lib/features/preferences/preferencesSlice";
import { userInitialState, userReducer } from "@/lib/features/user/userSlice";
import {
  uiDataInitialState,
  uiDataReducer,
} from "@/lib/features/uiData/uiDataSlice";
import {
  journeyInitialState,
  journeyReducer,
} from "@/lib/features/journey/journeySlice";

import { saveDataToRedis } from "@/lib/middleware/saveDataToRedis";

export const defaultState: State = {
  aboutYou: aboutYouInitialState,
  injuries: injuriesInitialState,
  yourGoals: yourGoalsInitialState,
  preferences: preferencesInitialState,
  user: userInitialState,
  uiData: uiDataInitialState,
  journey: journeyInitialState,
};

export const setStore = createAction<State>("store/setStore");

const rootReducer = combineReducers({
  aboutYou: aboutYouReducer,
  injuries: injuriesReducer,
  yourGoals: yourGoalsReducer,
  preferences: preferencesReducer,
  user: userReducer,
  uiData: uiDataReducer,
  journey: journeyReducer,
});

export const makeStore = (preloadedState?: State) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        ignoredActions: [
          "persist/REHYDRATE",
          "persist/PERSIST",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      }).concat(saveDataToRedis.middleware),
  });
};

export const selectState = createSelector(
  (state: RootState) => state,
  (state) => {
    return { ...state };
  }
);
