"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { v4 as uuidv4 } from "uuid";

import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
import styles from "@/styles/components/_rootLayout.module.scss";
import cookieAction from "@/lib/actions/cookie.action";

import Header from "./Header";

const RootUIComponent = ({ children }: { children: React.ReactNode }) => {
  const pageName = usePathname();
  const isFirstPage = pageName === "/";
  const centrePages = ["/error", "/success"];
  const centrePageLayout = centrePages.includes(pageName);
  const regex = /(\bquestions\b|-|\/)/g;
  const pageTitle = pageName.replace(regex, " ").trim();

  useEffect(() => {
    (async () => {
      const sessionCookie = await cookieAction(CookieAction.get, [
        Cookie.sessionCookie,
      ]);
      const sessionId = sessionStorage.getItem("sessionId");

      if (!sessionCookie && sessionId) {
        await cookieAction(
          CookieAction.set,
          [Cookie.sessionCookie],
          [sessionId]
        );
      }

      if (!sessionId) {
        const newId = uuidv4();
        await cookieAction(CookieAction.set, [Cookie.sessionCookie], [newId]);
        sessionStorage.setItem("sessionId", newId);
      }
      console.log("sessionId:", sessionId, "sessionCookie", sessionCookie);
    })();
  }, [pageName]);
  return (
    <main>
      <Header
        isFirstPage={isFirstPage}
        centrePageLayout={centrePageLayout}
        title={pageTitle}
      />
      <div
        className={`${
          isFirstPage ? styles.firstPageContainer : styles.defaultContainer
        }`}
      >
        {children}
      </div>
    </main>
  );
};

export default RootUIComponent;
