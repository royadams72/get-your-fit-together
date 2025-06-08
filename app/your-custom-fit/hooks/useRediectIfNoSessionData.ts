"use client";
import cookieAction from "@/lib/actions/cookie.action";
import { CookieAction, Cookie } from "@/types/enums/cookie.enum";
import { useState, useEffect } from "react";

const useRediectIfNoSessionData = () => {
  const [sessionCookie, setSessionCookie] = useState("");

  useEffect(() => {
    (async () => {
      const cookie = await cookieAction(CookieAction.get, [
        Cookie.sessionCookie,
      ]);
      console.log(cookie);

      setSessionCookie(cookie as string);
    })();
  }, []);
  console.log(sessionCookie);

  return sessionCookie !== "";
};
export default useRediectIfNoSessionData;
