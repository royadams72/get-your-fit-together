import { createAppSlice } from "@/lib/store/createAppSlice";
import { YourGoalsState, YourGoalsStore } from "@/types/interfaces/your-goals";

export const yourGoalsSliceName = "yourGoals";

export const yourGoalsInitialState: YourGoalsState = {
  yourGoals: {
    primaryGoal: "",
    secondaryGoal: "",
    motivationLevel: "",
    targetTimeline: "",
  },
};

export const yourGoalsSlice = createAppSlice({
  name: "yourGoals",
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
});

export const { setGoal } = yourGoalsSlice.actions;
export const yourGoalsReducer = yourGoalsSlice.reducer;
