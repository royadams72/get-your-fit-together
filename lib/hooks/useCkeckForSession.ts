"use client";
import { v4 as uuidv4 } from "uuid";
import { CookieAction, Cookie } from "@/types/enums/cookie.enum";
import cookieAction from "../actions/cookie.action";
import { useAppDispatch } from "./storeHooks";
import { setUiData } from "../features/uiData/uiDataSlice";
import { UiData } from "@/types/enums/uiData.enum";
const useCheckForSession = () => {
  const dispatch = useAppDispatch();
  const checkForSession = async () => {
    let sessionId = sessionStorage.getItem("sessionId");
    let sessionCookie = await cookieAction(CookieAction.get, [
      Cookie.sessionCookie,
    ]);
    console.log("!sessionId && !sessionCookie", !sessionId && !sessionCookie);

    if (!sessionId && !sessionCookie) {
      const newId = uuidv4();
      console.log("checkForSession sessionId:", newId);
      dispatch(setUiData({ name: UiData.sessionCookie, value: newId }));
      sessionStorage.setItem("sessionId", newId);
      await cookieAction(CookieAction.set, [Cookie.sessionCookie], [newId]);
      // const newCookie = await cookieAction(CookieAction.get, [
      //   Cookie.sessionCookie,
      // ]);
      // if (newCookie) {
      sessionId = newId;
      sessionCookie = newId;
      // }
    }

    if (!sessionCookie && sessionId) {
      await cookieAction(CookieAction.set, [Cookie.sessionCookie], [sessionId]);
      sessionCookie = sessionId;
    }

    if (!sessionId && sessionCookie) {
      sessionStorage.setItem("sessionId", sessionCookie);
      sessionId = sessionCookie;
    }
  };
  return checkForSession;
};

export default useCheckForSession;
