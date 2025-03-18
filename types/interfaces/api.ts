import { State } from "./store";

export interface DbResponse {
  _id: string;
  createdAt: Date;
  reduxState: State;
  updatedAt: Date;
}
