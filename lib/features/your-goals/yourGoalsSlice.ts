import { createAppSlice } from "@/lib/store/createAppSlice";
import { YourGoals } from "@/types/enums/your-goals.enum";
import { YourGoalsState, YourGoalsStore } from "@/types/interfaces/your-goals";

export const yourGoalsSliceName = "yourGoals";

export const yourGoalsInitialState: YourGoalsState = {
  yourGoals: {
    [YourGoals.primaryGoal]: "",
    [YourGoals.secondaryGoal]: "",
    [YourGoals.motivationLevel]: "",
    [YourGoals.targetTimeline]: "",
  },
};

export const yourGoalsSlice = createAppSlice({
  name: yourGoalsSliceName,
  initialState: yourGoalsInitialState,
  reducers: {
    setGoal: (state, action) => {
      const {
        name,
        value,
      }: {
        name: keyof YourGoalsStore;
        value: string;
      } = action.payload;
      state.yourGoals[name] = value;
    },
  },
  selectors: {
    getYourGoalsState: (state: YourGoalsState) => state.yourGoals,
  },
});

export const { setGoal } = yourGoalsSlice.actions;
export const yourGoalsReducer = yourGoalsSlice.reducer;
export const { getYourGoalsState } = yourGoalsSlice.selectors;
