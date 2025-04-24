"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import styles from "@/styles/components/_rootLayout.module.scss";
const RootUIComponent = ({ children }: { children: React.ReactNode }) => {
  const pageName = usePathname();
  const isFirstPage = pageName === "/";
  console.log(isFirstPage);

  return (
    <main>
      <Header isFirstPage={isFirstPage} />
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
