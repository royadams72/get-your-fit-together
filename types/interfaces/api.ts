import { State } from "./store";

export interface DbResponse {
  _id: string;
  createdAt: Date;
  reduxState: State;
  updatedAt: Date;
}

export interface ErrorObj {
  error: string;
  redirect?: boolean | undefined;
}

export interface ResponseOptions {
  status: number;
}
