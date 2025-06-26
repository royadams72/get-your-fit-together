// lib/services/response.service.ts

import fs from "fs/promises";
import path from "path";

import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
import { ResponseType } from "@/types/enums/response.enum";

import { formatDate } from "@/lib/utils/formatDate";

import cookieAction from "@/lib/actions/cookie.action";

export const response = async (message: string, action?: ResponseType) => {
  const redirect = action === ResponseType.redirect;
  const softError = action === ResponseType.softError;

  if (redirect) {
    const sessionCookie = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);

    if (!sessionCookie) {
      console.log("!sessionCookie && typeof window === undefined");
      return { redirect };
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

    return { redirect };
  }
  // })();
  return softError ? { message, softError } : { message };
};
