import { YourGoalsQuestions } from "../enums/your-goals.enum";

export interface YourGoalsStore {
  [YourGoalsQuestions.primaryGoal]: string;
  [YourGoalsQuestions.secondaryGoal]: string;
  [YourGoalsQuestions.motivationLevel]: string;
  [YourGoalsQuestions.targetTimeline]: string;
}

export interface YourGoalsState {
  yourGoals: YourGoalsStore;
}
