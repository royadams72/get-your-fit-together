import { YourGoals } from "../enums/your-goals.enum";

export type YourGoalsStore = {
  [key in YourGoals]: string;
};

export interface YourGoalsState {
  yourGoals: YourGoalsStore;
}
