import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { PersistPartial } from "redux-persist/es/persistReducer";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import { AboutYouState } from "@/types/interfaces/about-you";
import { InjuriesState } from "@/types/interfaces/injuries";
import { YourGoalsState } from "@/types/interfaces/your-goals";
import { PreferencesState } from "@/types/interfaces/preferences";

import {
  aboutYouReducer,
  aboutYouSliceName,
} from "@/lib/features/about-you/aboutYouSlice";
import {
  yourGoalsReducer,
  yourGoalsSliceName,
} from "@/lib/features/your-goals/yourGoalsSlice";
import {
  injuriesReducer,
  injuriesSliceName,
} from "@/lib/features/injuries/injuriesSlice";
import {
  preferencesReducer,
  preferencesSliceName,
} from "@/lib/features/preferences/preferencesSlice";
import {
  userReducer,
  userSliceName,
  UserState,
} from "@/lib/features/user/userSlice";

interface StoreInterface {
  aboutYou: AboutYouState;
  injuries: InjuriesState;
  yourGoals: YourGoalsState;
  preferences: PreferencesState;
  user: UserState;
}

const rootReducer = combineReducers({
  aboutYou: aboutYouReducer,
  injuries: injuriesReducer,
  yourGoals: yourGoalsReducer,
  preferences: preferencesReducer,
  user: userReducer,
});

const persistConfig: PersistConfig<StoreInterface> = {
  key: "root",
  storage,
  whitelist: [
    aboutYouSliceName,
    injuriesSliceName,
    yourGoalsSliceName,
    preferencesSliceName,
    userSliceName,
  ],
};

const persistedReducer = persistReducer<StoreInterface>(
  persistConfig,
  rootReducer
);

// const defaultState: StoreInterface = {
//   aboutYou: aboutYouInitialState,
//   injuries: injuriesInitialState,
//   yourGoals: yourGoalsInitialState,
//   preferences: preferencesInitialState,
//   user: userInitialState,
// };

export const makeStore = (preloadedState?: StoreInterface & PersistPartial) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

export const persistor = persistStore(makeStore());
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
