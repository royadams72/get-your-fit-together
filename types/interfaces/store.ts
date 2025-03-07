import { UserState } from "../enums/user.enums";
import { AboutYouState } from "./about-you";
import { InjuriesState } from "./injuries";
import { PreferencesState } from "./preferences";
import { YourGoalsState } from "./your-goals";

export interface StoreInterface {
  aboutYou: AboutYouState;
  injuries: InjuriesState;
  yourGoals: YourGoalsState;
  preferences: PreferencesState;
  user: UserState;
}
