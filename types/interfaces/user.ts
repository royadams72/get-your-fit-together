import { FitPlan } from "./fitness-plan";

export interface UserStore {
  userName: string;
  userPassword: string;
  userFitnessPlan?: FitPlan;
}
export interface UserState {
  user: UserStore;
}
