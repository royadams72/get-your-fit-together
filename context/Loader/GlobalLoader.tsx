import React from "react";
import styles from "./_loader.module.scss";
import { useLoader } from "./LoaderProvider";

const GlobalLoader = () => {
  const { isLoading } = useLoader();
  if (!isLoading) return null;

  return <div className={styles.loader}></div>;
};

export default GlobalLoader;
