"use server";
import { v4 as uuidv4 } from "uuid";
import { CookieAction, Cookie } from "@/types/enums/cookie.enum";
import cookieAction from "./cookie.action";

const createOrRefreshSession = async () => {
  const sessionCookie = await cookieAction(CookieAction.get, [
    Cookie.sessionCookie,
  ]);
  let newCookie = "";

  const setCookie = async (cookie: string) => {
    return await cookieAction(
      CookieAction.set,
      [Cookie.sessionCookie],
      [cookie],
      [{ maxAge: 600, httpOnly: true }]
    );
  };

  if (!sessionCookie) {
    newCookie = uuidv4();
    await setCookie(newCookie);
  } else {
    await setCookie(sessionCookie);
  }

  return sessionCookie || newCookie;
};

export default createOrRefreshSession;
