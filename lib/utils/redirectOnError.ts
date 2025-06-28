"use server";
import fs from "fs/promises";
import { redirect as redirectTo } from "next/navigation";
import { PATHS } from "@/routes.config";
import { ResponseType } from "@/types/enums/response.enum";

import path from "path";
import { verifySession } from "../server-functions/verifySession";
import { formatDate } from "./formatDate";
import { RootState } from "@/types/interfaces/store";
import { ResponseObj } from "@/types/interfaces/response";

export const redirectOnError = async ({
  message,
  redirect,
  softError,
}: ResponseObj) => {
  if (redirect) {
    const sessionResult = await verifySession(false);

    console.log("sessionResult::", sessionResult);

    if (!sessionResult || !sessionResult.userSessionState) {
      return { message: "whaaaattttt!!", redirect: true };
    }
    const { userSessionState } = sessionResult;

    if (!userSessionState) {
      console.log("!sessionId && typeof window === undefined");
      return { redirect };
    }

    const {
      user: {
        user: { userName },
      },
      uiData: {
        uiData: { sessionId },
      },
    } = userSessionState as RootState;

    const timestamp = formatDate(undefined, true);
    const errorStr = `${sessionId} ${userName} ${message} ${timestamp}`;
    const errorPath = path.resolve(process.cwd(), "error-log.txt");
    await fs.appendFile(errorPath, `${errorStr}\n`);

    redirectTo(PATHS.ERROR as string);
  }

  return softError ? { message, softError } : { message };
};
