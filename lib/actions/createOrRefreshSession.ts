"use server";
import { v4 as uuidv4 } from "uuid";
import { CookieAction, Cookie } from "@/types/enums/cookie.enum";
import cookieAction from "./cookie.action";

const createOrRefreshSession = async (shouldCreateNew = true) => {
  const sessionCookie = await cookieAction(CookieAction.get, [
    Cookie.sessionCookie,
  ]);

  const setCookie = async (cookie: string) => {
    return await cookieAction(
      CookieAction.set,
      [Cookie.sessionCookie],
      [cookie],
      [{ maxAge: 600, httpOnly: true }]
    );
  };

  let sessionId = sessionCookie;

  if (!sessionCookie && shouldCreateNew) {
    sessionId = uuidv4();
    console.log("No session cookie found. Creating new:", sessionId);
  } else {
    console.log("Existing session cookie found. Refreshing:", sessionId);
  }

  await setCookie(sessionId ?? "");
  return sessionId ?? "";
};

export default createOrRefreshSession;
