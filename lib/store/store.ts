import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { aboutYouReducer } from "../features/about-you/aboutYouSlice";

const rootReducer = combineReducers({
  aboutYou: aboutYouReducer,
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
