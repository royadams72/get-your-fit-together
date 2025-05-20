"use client";

import styles from "@/styles/components/_header.module.scss";

const Header = ({
  isFirstPage,
  title,
  centrePageLayout,
}: {
  isFirstPage: boolean;
  title: string;
  centrePageLayout: boolean;
}) => {
  return (
    <header
      className={`${styles.header}${
        !isFirstPage ? " " + styles.headerSmall : ""
      }`}
    >
      <h1 style={centrePageLayout ? { textAlign: "center" } : {}}>
        Get Your {isFirstPage && <br />}
        <span style={{ color: "var(--quaternary-colour)" }}>Fit</span> Together
      </h1>
      {!isFirstPage && (
        <h2
          className={styles.headerTitle}
          style={
            centrePageLayout ? { textAlign: "center", paddingLeft: "0" } : {}
          }
        >
          {title}
        </h2>
      )}
    </header>
  );
};

export default Header;
