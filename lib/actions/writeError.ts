"use server";
import fs from "fs/promises";
import path from "path";

import { UserCache } from "@/types/interfaces/redis";
import { ResponseObj } from "@/types/interfaces/response";
import { isRedirectResponse } from "@/types/guards/isRedirectResponse";

import { verifySession } from "@/lib/actions/verifySession";
import { formatDate } from "@/lib/utils/formatDate";

export const writeError = async (message: string, suppressFailure = true) => {
  try {
    const sessionResult: UserCache | ResponseObj | null = await verifySession();

    if (
      !sessionResult ||
      isRedirectResponse(sessionResult) ||
      !("userSessionState" in sessionResult)
    ) {
      throw new Error("Could not verify session");
    }

    const {
      userSessionState: {
        user: {
          user: { userName },
        },
      },
      sessionMeta: { sessionId },
    } = sessionResult;

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
