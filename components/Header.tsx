"use client";

import styles from "@/styles/components/_header.module.scss";

const Header = ({
  isFirstPage,
  title,
}: {
  isFirstPage: boolean;
  title: string;
}) => {
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
      {!isFirstPage && <h2 className={styles.headerTitle}>{title}</h2>}
    </header>
  );
};

export default Header;
