import { State } from "./store";

export interface DbResponse {
  _id: string;
  createdAt: Date;
  reduxState: State;
  updatedAt: Date;
}

export interface CustomApiError {
  error: string;
  ignore: boolean | undefined;
  requestUrl?: string;
}

export interface ResponseOptions {
  status: number;
}
