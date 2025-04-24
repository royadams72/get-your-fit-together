"use client";

import styles from "@/styles/components/_header.module.scss";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const pageName = usePathname();
  const [paddingTop, setPaddingTop] = useState("0");
  console.log(pageName);
  const isFirstPage = pageName === "/";

  useEffect(() => {
    if (!isFirstPage) {
      setPaddingTop("7rem");
    }
  }, [isFirstPage]);

  console.log(isFirstPage, pageName);

  return (
    <div className={styles.headerWrapper}>
      <header
        className={`${styles.header}${
          !isFirstPage ? " " + styles.headerSmall : ""
        }`}
      >
        <h1>
          Get Your {isFirstPage && <br />}
          <span style={{ color: "var(--quaternary-colour)" }}>Fit</span>{" "}
          Together
        </h1>
      </header>
    </div>
  );
};

export default Header;
