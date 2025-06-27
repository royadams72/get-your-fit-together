// lib/server-functions/getErrorLog.ts

import fs from "fs/promises";
import path from "path";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
import cookieAction from "../actions/cookie.action";

const errorLogPath = path.resolve(process.cwd(), "error-log.txt");

export const getLastErrorMessage = async (): Promise<string> => {
  try {
    const sessionCookie = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);

    if (!sessionCookie) {
      return "No session cookie found.";
    }

    const content = await fs.readFile(errorLogPath, "utf-8");
    const lines = content.trim().split("\n");

    const lastMatch = [...lines]
      .reverse()
      .find((line) => line.startsWith(sessionCookie));

    return (
      lastMatch?.replace(sessionCookie, "") ||
      "There has been an unexpected error."
    );
  } catch (err) {
    console.error("Error reading log:", err);
    return "Could not read error log.";
  }
};
