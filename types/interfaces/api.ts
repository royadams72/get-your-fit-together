import { State } from "./store";

export interface DbResponse {
  _id: string;
  userPassword: string;
  createdAt: Date;
  savedState: State;
  updatedAt: Date;
}
