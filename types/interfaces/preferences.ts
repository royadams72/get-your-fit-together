import { Preferences } from "../enums/preferences.enum";

export interface PreferencesStore {
  [Preferences.preferredWorkoutType]: string;
  [Preferences.equipmentAvailability]: string;
  [Preferences.timePerSession]: string;
  [Preferences.daysPerWeek]: string;
  [Preferences.workoutTime]: string;
  [Preferences.socialPreference]: string;
}

export interface PreferencesState {
  preferences: PreferencesStore;
}
