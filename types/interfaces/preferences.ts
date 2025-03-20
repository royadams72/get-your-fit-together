import { Preferences } from "../enums/preferences.enum";

export type PreferencesStore = {
  [key in Preferences]: string;
};

export interface PreferencesState {
  preferences: PreferencesStore;
}
