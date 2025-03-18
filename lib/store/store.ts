import {
  combineReducers,
  configureStore,
  createAction,
  createSelector,
  PayloadAction,
  UnknownAction,
} from "@reduxjs/toolkit";

import { PersistPartial } from "redux-persist/es/persistReducer";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import { RootState, State } from "@/types/interfaces/store";

import {
  aboutYouInitialState,
  aboutYouReducer,
  aboutYouSliceName,
} from "@/lib/features/about-you/aboutYouSlice";
import {
  yourGoalsInitialState,
  yourGoalsReducer,
  yourGoalsSliceName,
} from "@/lib/features/your-goals/yourGoalsSlice";
import {
  injuriesInitialState,
  injuriesReducer,
  injuriesSliceName,
} from "@/lib/features/injuries/injuriesSlice";
import {
  preferencesInitialState,
  preferencesReducer,
  preferencesSliceName,
} from "@/lib/features/preferences/preferencesSlice";
import {
  userInitialState,
  userReducer,
  userSliceName,
} from "@/lib/features/user/userSlice";
import {
  uiDataInitialState,
  uiDataReducer,
  uiDataSliceName,
} from "../features/ui-data/uiDataSlice";
import {
  journeyInitialState,
  journeyReducer,
  journeySliceName,
} from "../features/journey/journeySlice";

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

const persistConfig: PersistConfig<State> = {
  key: "root",
  storage,
  whitelist: [
    aboutYouSliceName,
    injuriesSliceName,
    yourGoalsSliceName,
    preferencesSliceName,
    userSliceName,
    uiDataSliceName,
    journeySliceName,
  ],
};

const persistedReducer = persistReducer<State>(
  persistConfig,
  (state: State | undefined, action: UnknownAction) => {
    if (action.type === setStore.type && isPayInloadAction(action)) {
      return action.payload;
    }
    return rootReducer(state, action);
  }
);

export const makeStore = (preloadedState?: State & PersistPartial) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      }),
  });
};

export const persistor = persistStore(makeStore());

function isPayInloadAction(
  action: UnknownAction
): action is PayloadAction<State> {
  return "payload" in action && typeof action.payload === "object";
}

export const selectState = createSelector(
  (state: RootState & PersistPartial) => state,
  (state) => {
    return { ...state };
  }
);
