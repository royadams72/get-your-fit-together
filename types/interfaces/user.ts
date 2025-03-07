export interface UserStore {
  userName: string;
  userPassword: string;
  userFitnessPlan?: any;
}
export interface UserState {
  user: UserStore;
}
