import { State } from "./store";

export interface DbResponse {
  _id: string;
  createdAt: Date;
  reduxState: State;
  updatedAt: Date;
}

export interface ResponseObj {
  message?: string;
  redirect?: boolean | undefined;
  redirectTo?: string;
}

export interface ResponseOptions {
  status: number;
}
