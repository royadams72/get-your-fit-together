// lib/services/response.service.ts

import { redirect as serverRedirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";

import { ResponseObj } from "@/types/interfaces/api";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
import { RootState } from "@/types/interfaces/store";

import { getStateFromRedis } from "../server-functions/getStateFromRedis";
import cookieService from "./cookie.service";
import { formatDate } from "../utils/formatDate";
import { PATHS } from "@/routes.config";
import cookieAction from "../actions/cookie.action";

export const response = async (message: string, redirect?: boolean) => {
  // if (!resObj.redirect) return resObj;

  // Log the error
  // (async () => {
  if (redirect) {
    const sessionCookie = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);

    if (!sessionCookie && typeof window === "undefined") {
      console.log("!sessionCookie && typeof window === undefined");
      return serverRedirect(PATHS.ERROR);
    } else if (!sessionCookie && typeof window !== "undefined") {
      return { message, clientRedirectTo: PATHS.ERROR };
    }
    // const state = await getStateFromRedis(sessionCookie as string);
    const userName = "test user";
    // const {
    //   user: {
    //     user: { userName },
    //   },
    // } = state as RootState;

    const timestamp = formatDate(undefined, true);
    const errorStr = `${sessionCookie} ${userName} ${message} ${timestamp}`;
    const errorPath = path.resolve(process.cwd(), "error-log.txt");
    await fs.appendFile(errorPath, `${errorStr}\n`);
    console.log("wtf is going on", { redirect });

    //   // Client: return redirect info to caller
    return { redirect };
  }
  // })();
  return { message };
};
