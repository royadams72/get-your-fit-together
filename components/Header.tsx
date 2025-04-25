"use client";

import styles from "@/styles/components/_header.module.scss";

const Header = ({ isFirstPage }: { isFirstPage: boolean }) => {
  return (
    <header
      className={`${styles.header}${
        !isFirstPage ? " " + styles.headerSmall : ""
      }`}
    >
      <h1>
        Get Your {isFirstPage && <br />}
        <span style={{ color: "var(--quaternary-colour)" }}>Fit</span> Together
      </h1>
    </header>
  );
};

export default Header;
