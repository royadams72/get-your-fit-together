import { createAppSlice } from "@/lib/store/createAppSlice";
import { PreferencesQuestions } from "@/types/enums/preferences.enum";
import {
  preferencesState,
  preferencesStore,
} from "@/types/interfaces/preferences";

export const preferencesInitialState: preferencesState = {
  preferences: {
    [PreferencesQuestions.preferredWorkoutType]: "",
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
      if (name === PreferencesQuestions.preferredWorkoutType) {
        let stateValue = state.preferences[name];
        let inState = state.preferences[name].indexOf(value) != -1;
        console.log(inState);

        if (inState) {
          console.log(state.preferences[name]);
          state.preferences[name] = state.preferences[name].replace(
            new RegExp(`(^|, )${value}(, |$)`, "g"),
            ""
          );
        } else {
          const val = state.preferences[name] === "" ? value : `, ${value}`;
          state.preferences[name] += val;
        }
      } else {
        state.preferences[name] = value;
      }
      console.log(state.preferences[name]);
    },
  },
});

export const { setPreference } = preferencesSlice.actions;
export const preferencesReducer = preferencesSlice.reducer;
