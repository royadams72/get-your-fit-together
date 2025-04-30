import { createAppSlice } from "@/lib/store/createAppSlice";
import { Preferences } from "@/types/enums/preferences.enum";
import {
  PreferencesState,
  PreferencesStore,
} from "@/types/interfaces/preferences";

export const preferencesSliceName = "preferences";

export const preferencesInitialState: PreferencesState = {
  preferences: {
    [Preferences.preferredWorkoutType]: "",
    [Preferences.equipmentAvailability]: "",
    [Preferences.timePerSession]: "",
    [Preferences.daysPerWeek]: "",
    [Preferences.workoutTime]: "",
    [Preferences.socialPreference]: "",
  },
};

export const preferencesSlice = createAppSlice({
  name: preferencesSliceName,
  initialState: preferencesInitialState,
  reducers: {
    setPreference: (state, action) => {
      const {
        name,
        value,
      }: {
        name: keyof PreferencesStore;
        value: string;
      } = action.payload;
      if (name === Preferences.preferredWorkoutType) {
        const inState = state.preferences[name].indexOf(value) != -1;

        if (inState) {
          state.preferences[name] = state.preferences[name].replace(
            new RegExp(`(^|\\|)${value}(|\\|$|$)`, "g"),
            ""
          );
        } else {
          const val = state.preferences[name] === "" ? value : `|${value}`;
          state.preferences[name] += val;
        }
      } else {
        state.preferences[name] = value;
      }
    },
  },
  selectors: {
    getPreferencesState: (state: PreferencesState) => state.preferences,
  },
});

export const { setPreference } = preferencesSlice.actions;
export const preferencesReducer = preferencesSlice.reducer;
export const { getPreferencesState } = preferencesSlice.selectors;
