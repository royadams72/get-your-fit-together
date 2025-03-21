import { User } from "../enums/user.enum";

export type UserStore = {
  [key in Exclude<User, "userName" | "password">]: object;
} & {
  [key in User]: string;
};
export interface UserState {
  user: UserStore;
}
