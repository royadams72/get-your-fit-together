import { createAppSlice } from "@/lib/store/createAppSlice";
import { yourGoalsState, yourGoalsStore } from "@/types/interfaces/your-goals";

export const yourGoalsInitialState: yourGoalsState = {
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
        name: keyof yourGoalsStore;
        value: string;
      } = action.payload;
      state.yourGoals[name] = value;
    },
  },
});

export const { setGoal } = yourGoalsSlice.actions;
export const yourGoalsReducer = yourGoalsSlice.reducer;
