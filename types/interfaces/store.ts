import { makeStore } from "@/lib/store/store";
import { UserState } from "./user";
import { AboutYouState } from "./about-you";
import { InjuriesState } from "./injuries";
import { PreferencesState } from "./preferences";
import { YourGoalsState } from "./your-goals";
import { UiDataState } from "./uiData";
import { JourneyState } from "./journey";

export interface State {
  aboutYou: AboutYouState;
  injuries: InjuriesState;
  yourGoals: YourGoalsState;
  preferences: PreferencesState;
  user: UserState;
  uiData: UiDataState;
  journey: JourneyState;
}

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
