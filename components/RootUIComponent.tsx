"use client";

import { usePathname } from "next/navigation";
import styles from "@/styles/components/_rootLayout.module.scss";
import Header from "./Header";
import SessionInitialiser from "@/components/SessionInitialiser";
import HandleSessionTimeout from "./HandleSessionTimeout";
import NavigationLoader from "./NavigationLoader";

const RootUIComponent = ({ children }: { children: React.ReactNode }) => {
  const pageName = usePathname();
  const isFirstPage = pageName === "/";
  const centrePages = ["/error", "/success"];
  const centrePageLayout = centrePages.includes(pageName);
  const regex = /(\bquestions\b|-|\/)/g;
  const pageTitle = pageName.replace(regex, " ").trim();

  return (
    <main>
      <NavigationLoader />
      <SessionInitialiser pageName={pageName} />
      <HandleSessionTimeout pageName={pageName} />
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
