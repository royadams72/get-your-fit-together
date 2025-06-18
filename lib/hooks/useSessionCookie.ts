import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useSessionCookie = (cookieName = "sessionCookie") => {
  const [cookieValue, setCookieValue] = useState<string | null>(null);

  // useEffect(() => {
  //   console.log("useCookie");

  //   const getCookie = (name: string) => {
  //     const match = document.cookie.match(
  //       new RegExp("(^| )" + name + "=([^;]+)")
  //     );
  //     return match ? match[2] : undefined;
  //   };

  //   const existing = getCookie(cookieName);

  //   if (!existing) {
  //     const newVal = uuidv4();
  //     const expiry = new Date();
  //     expiry.setDate(expiry.getDate() + 7); // 7-day expiry

  //     document.cookie = `${cookieName}=${newVal}; path=/; expires=${expiry.toUTCString()};`;
  //     setCookieValue(newVal);
  //   } else {
  //     setCookieValue(existing);
  //   }
  // }, [cookieName]);

  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? match[2] : undefined;
    };

    const existing = getCookie(cookieName);
    console.log("✅ [BEFORE] document.cookie:", document.cookie);

    if (!existing) {
      const val = Math.random().toString().slice(2);
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      document.cookie = `${cookieName}=${val}; path=/; expires=${expires.toUTCString()}; samesite=lax`;
      console.log("🆕 Set cookie:", val);
    } else {
      console.log("🎯 Existing cookie:", existing);
    }

    console.log("✅ [AFTER] document.cookie:", document.cookie);
  }, [cookieName]);

  return cookieValue;
};
