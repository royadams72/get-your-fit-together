import { YourGoals } from "../enums/your-goals.enum";

export interface YourGoalsStore {
  [YourGoals.primaryGoal]: string;
  [YourGoals.secondaryGoal]: string;
  [YourGoals.motivationLevel]: string;
  [YourGoals.targetTimeline]: string;
}

export interface YourGoalsState {
  yourGoals: YourGoalsStore;
}
