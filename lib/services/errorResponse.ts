import { ResponseObj } from "@/types/interfaces/api";
import fs from "fs";
import { getStateFromRedis } from "../server-functions/getStateFromRedis";
import cookieAction from "../actions/cookie.action";
import { Cookie } from "@/types/enums/cookie.enum";
import cookieService from "./cookie.service";
import { RootState } from "@/types/interfaces/store";
import { formatDate } from "../utils/formatDate";

export const response = async (errorObj: ResponseObj) => {
  console.log(errorObj);
  const sessionCookie = await cookieService.get(Cookie.sessionCookie);
  console.log(sessionCookie);

  const state = await getStateFromRedis(sessionCookie as string);
  const {
    user: {
      user: { userName },
    },
  } = state as RootState;
  const dateAndTime = formatDate(undefined, true);
  const errorStr = `${userName} ${errorObj.error}`;
  // return error;
};
