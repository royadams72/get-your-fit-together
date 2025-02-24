import { PreferencesQuestions } from "../enums/preferences.enum";

export interface PreferencesStore {
  [PreferencesQuestions.preferredWorkoutType]: string;
  [PreferencesQuestions.equipmentAvailability]: string;
  [PreferencesQuestions.timePerSession]: string;
  [PreferencesQuestions.daysPerWeek]: string;
  [PreferencesQuestions.workoutTime]: string;
  [PreferencesQuestions.socialPreference]: string;
}

export interface PreferencesState {
  preferences: PreferencesStore;
}
