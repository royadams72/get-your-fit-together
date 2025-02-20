import { PreferencesQuestions } from "../enums/preferences.enum";

export interface preferencesStore {
  [PreferencesQuestions.cardio]: string;
  [PreferencesQuestions.hiit]: string;
  [PreferencesQuestions.yogaFlexibility]: string;
  [PreferencesQuestions.pilatesCoreTraining]: string;
  [PreferencesQuestions.bodyweightCalisthenics]: string;
  [PreferencesQuestions.crossFitCircuitTraining]: string;
  [PreferencesQuestions.sportsSpecificTraining]: string;
  [PreferencesQuestions.danceAerobicWorkouts]: string;
  [PreferencesQuestions.combatSports]: string;
  [PreferencesQuestions.outdoorWorkoutsHiking]: string;
  [PreferencesQuestions.equipmentAvailability]: string;
  [PreferencesQuestions.timePerSession]: string;
  [PreferencesQuestions.daysPerWeek]: string;
  [PreferencesQuestions.workoutTime]: string;
  [PreferencesQuestions.socialPreference]: string;
}

export interface preferencesState {
  preferences: preferencesStore;
}
