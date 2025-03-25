export interface UserStore {
  userName: string;
  userPassword: string;
  userFitnessPlan?: object;
}
export interface UserState {
  user: UserStore;
}
