import fs from "fs/promises";
import path from "path";

import { ResponseType } from "@/types/enums/response.enum";

import { formatDate } from "@/lib/utils/formatDate";

import { verifySession } from "@/lib/server-functions/verifySession";
import { RootState } from "@/types/interfaces/store";

export const response = async (message: string, action?: ResponseType) => {
  const redirect = action === ResponseType.redirect;
  const softError = action === ResponseType.softError;

  if (redirect) {
    const userSession = await verifySession(false);

    if (!userSession) {
      console.log("!sessionId && typeof window === undefined");
      return { redirect };
    }

    const {
      user: {
        user: { userName },
      },
    } = userSession as RootState;

    const timestamp = formatDate(undefined, true);
    const errorStr = `${userSession.sessionId} ${userName} ${message} ${timestamp}`;
    const errorPath = path.resolve(process.cwd(), "error-log.txt");
    await fs.appendFile(errorPath, `${errorStr}\n`);

    return { redirect };
  }

  return softError ? { message, softError } : { message };
};
