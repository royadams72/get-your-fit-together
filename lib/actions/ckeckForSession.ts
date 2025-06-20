import { v4 as uuidv4 } from "uuid";
import { CookieAction, Cookie } from "@/types/enums/cookie.enum";
import cookieAction from "./cookie.action";
const checkForSession = async () => {
  let sessionId = sessionStorage.getItem("sessionId");
  let sessionCookie = await cookieAction(CookieAction.get, [
    Cookie.sessionCookie,
  ]);

  if (!sessionId && !sessionCookie) {
    const newId = uuidv4();
    sessionStorage.setItem("sessionId", newId);
    await cookieAction(CookieAction.set, [Cookie.sessionCookie], [newId]);
    sessionId = newId;
    sessionCookie = newId;
  }

  if (!sessionCookie && sessionId) {
    await cookieAction(CookieAction.set, [Cookie.sessionCookie], [sessionId]);
    sessionCookie = sessionId;
  }

  if (!sessionId && sessionCookie) {
    sessionStorage.setItem("sessionId", sessionCookie);
    sessionId = sessionCookie;
  }

  console.log(
    "checkForSession sessionId:",
    sessionId,
    "sessionCookie:",
    sessionCookie
  );
};
export default checkForSession;
