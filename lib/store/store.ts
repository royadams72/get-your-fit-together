import {
  combineReducers,
  configureStore,
  createAction,
  createSelector,
  PayloadAction,
  Reducer,
  UnknownAction,
} from "@reduxjs/toolkit";

import { PersistPartial } from "redux-persist/es/persistReducer";
import {
  PersistConfig,
  persistReducer,
  persistStore,
  REHYDRATE,
} from "redux-persist";
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
import noopStorage from "../utils/noopStorage";
import { isEmpty } from "../utils/isEmpty";

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
const isServer = typeof window === "undefined";

const persistConfig: PersistConfig<State> = {
  key: "root",
  storage: isServer ? noopStorage : storage,
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

// const persistedReducer = persistReducer<State>(
//   persistConfig,
//   (state: any, action: UnknownAction) => {
//     if (action.type === setStore.type && isPayInloadAction(action)) {
//       return action.payload;
//     }
//     if (action.type === "persist/REHYDRATE" && isPayInloadAction(action)) {
//       console.log(
//         "persist/REHYDRATE merged",

//         action.payload
//       );

//       return isEmpty(action.payload)
//         ? state // ✅ keep server state
//         : action.payload; // merge if there is something useful
//     }
//     return rootReducer(state, action);
//   }
// );

export const makeStore = (
  preloadedState?: any
  // preloadedState?: State | (State & PersistPartial)
) => {
  console.log("preloadedState makestore:", preloadedState);
  const reducer = persistReducer<State>(
    persistConfig,
    (state: State | undefined, action: UnknownAction): any => {
      if (action.type === setStore.type && isPayInloadAction(action)) {
        return action.payload;
      }

      if (action.type === REHYDRATE && isPayInloadAction(action)) {
        if (preloadedState) {
          console.log("Skipping REHYDRATE overwrite. Using SSR state.", {
            ...state,
            _persist: {
              version: -1,
              rehydrated: true,
            },
          });

          action.payload = {
            ...(state as any),
            _persist: {
              version: -1,
              rehydrated: true,
            },
          } as any;

          return action.payload;
        }

        // Otherwise, allow payload to overwrite state
        console.log("returning from reducer::::");
        return action.payload;
      }

      return rootReducer(state, action);
    }
  );
  return configureStore({
    reducer: reducer,
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
      }),
  });
};

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
