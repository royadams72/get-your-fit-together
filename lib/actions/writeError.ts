"use server";
import fs from "fs/promises";
import path from "path";
import { verifySession } from "./verifySession";
import { formatDate } from "../utils/formatDate";
import { RootState } from "@/types/interfaces/store";

export const writeError = async (message: string) => {
  const sessionResult = await verifySession(false);

  // console.log("sessionResult::", sessionResult);

  if (!sessionResult || !sessionResult.userSessionState) {
    return { message: "whaaaattttt!!", redirect: true };
  }
  const { userSessionState } = sessionResult;

  if (!userSessionState) {
    console.log("!sessionId && typeof window === undefined");
    return { message: "whaaaattttt!!", redirect: true };
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
};
