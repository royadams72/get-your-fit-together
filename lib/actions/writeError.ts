"use server";
import fs from "fs/promises";
import path from "path";
import { verifySession } from "./verifySession";
import { formatDate } from "../utils/formatDate";
import { RootState } from "@/types/interfaces/store";
import { UserCache } from "@/types/interfaces/redis";
import { ResponseObj } from "@/types/interfaces/response";
import { isRedirectResponse } from "@/types/guards/isRedirectResponse";

export const writeError = async (message: string, suppressFailure = true) => {
  try {
    const sessionResult: UserCache | ResponseObj | null = await verifySession(
      false
    );

    if (!sessionResult || isRedirectResponse(sessionResult)) {
      throw new Error("Could not verify session");
    }

    const { userSessionState } = sessionResult as UserCache;

    if (!userSessionState) {
      throw new Error("No user cache could be retrieved");
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
  } catch (error) {
    /* suppressing failure by default, don't need to redirect,
    as if we can't write to a file, there's a fallback message*/
    if (!suppressFailure) {
      console.error("writeError failure:", error);
    }
  }
};
