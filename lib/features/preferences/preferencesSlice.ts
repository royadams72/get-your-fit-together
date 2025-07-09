import { createAppSlice } from "@/lib/store/createAppSlice";
import { Preferences } from "@/types/enums/preferences.enum";
import {
  PreferencesState,
  PreferencesStore,
} from "@/types/interfaces/preferences";

export const preferencesSliceName = "preferences";

export const preferencesInitialState: PreferencesState = {
  preferences: {
    [Preferences.preferredWorkoutType]: [],
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
        togglePreference(state, name, value);
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

function togglePreference(
  state: PreferencesState,
  name: keyof PreferencesStore,
  value: string
) {
  const arr = state.preferences[name] as string[];
  const index = arr.indexOf(value);

  if (index !== -1) {
    arr.splice(index, 1);
  } else {
    arr.push(value);
  }
}
