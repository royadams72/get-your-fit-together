import { PreferencesQuestions } from "../enums/preferences.enum";

export interface preferencesStore {
  [PreferencesQuestions.preferredWorkoutType]: string;
  [PreferencesQuestions.equipmentAvailability]: string;
  [PreferencesQuestions.timePerSession]: string;
  [PreferencesQuestions.daysPerWeek]: string;
  [PreferencesQuestions.workoutTime]: string;
  [PreferencesQuestions.socialPreference]: string;
}

export interface preferencesState {
  preferences: preferencesStore;
}
