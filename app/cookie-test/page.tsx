"use client";

import { useEffect } from "react";

export default function CookieTestPage() {
  useEffect(() => {
    const cookieName = "sessionCookie2";
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
  }, []);

  return <div>Check console + DevTools → Application → Cookies</div>;
}
