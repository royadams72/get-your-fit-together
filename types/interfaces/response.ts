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
  softError?: boolean | undefined;
  isError?: boolean | undefined;
}

export interface ResponseOptions {
  status: number;
}
