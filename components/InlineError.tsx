import React from "react";
import styles from "@/styles/components/form/_commonStyles.module.scss";
const InlineError = ({ error }: { error: string }) => {
  return <div className={styles.inlineError}>{error}</div>;
};

export default InlineError;
