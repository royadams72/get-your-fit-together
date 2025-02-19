import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { aboutYouReducer } from "@/lib/features/about-you/aboutYouSlice";
import { yourGoalsReducer } from "@/lib/features/your-goals/yourGoalsSlice";
import { injuriesReducer } from "@/lib/features/injuries/injuriesSlice";
import { preferencesReducer } from "@/lib/features/preferences/preferencesSlice";

const rootReducer = combineReducers({
  aboutYou: aboutYouReducer,
  injuries: injuriesReducer,
  yourGoals: yourGoalsReducer,
  preferences: preferencesReducer,
});

export const makeStore = (preloadedState?: {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
