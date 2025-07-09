import { Preferences } from "../enums/preferences.enum";

export type PreferencesStore = {
  [key in Preferences]: key extends Preferences.preferredWorkoutType
    ? string[]
    : string;
};

export interface PreferencesState {
  preferences: PreferencesStore;
}
