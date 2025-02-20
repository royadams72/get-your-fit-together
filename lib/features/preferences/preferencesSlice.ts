import { createAppSlice } from "@/lib/store/createAppSlice";
import { PreferencesQuestions } from "@/types/enums/preferences.enum";
import {
  preferencesState,
  preferencesStore,
} from "@/types/interfaces/preferences";

export const preferencesInitialState: preferencesState = {
  preferences: {
    [PreferencesQuestions.cardio]: "",
    [PreferencesQuestions.hiit]: "",
    [PreferencesQuestions.yogaFlexibility]: "",
    [PreferencesQuestions.pilatesCoreTraining]: "",
    [PreferencesQuestions.bodyweightCalisthenics]: "",
    [PreferencesQuestions.crossFitCircuitTraining]: "",
    [PreferencesQuestions.sportsSpecificTraining]: "",
    [PreferencesQuestions.danceAerobicWorkouts]: "",
    [PreferencesQuestions.combatSports]: "",
    [PreferencesQuestions.outdoorWorkoutsHiking]: "",
    [PreferencesQuestions.equipmentAvailability]: "",
    [PreferencesQuestions.timePerSession]: "",
    [PreferencesQuestions.daysPerWeek]: "",
    [PreferencesQuestions.workoutTime]: "",
    [PreferencesQuestions.socialPreference]: "",
  },
};

export const preferencesSlice = createAppSlice({
  name: "preferences",
  initialState: preferencesInitialState,
  reducers: {
    setPreference: (state, action) => {
      const {
        name,
        value,
      }: {
        name: keyof preferencesStore;
        value: string;
      } = action.payload;
      state.preferences[name] = value;
    },
  },
});

export const { setPreference } = preferencesSlice.actions;
export const preferencesReducer = preferencesSlice.reducer;
