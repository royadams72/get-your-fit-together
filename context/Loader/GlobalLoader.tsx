import React from "react";
import styles from "./_loader.module.scss";
import { useLoader } from "./LoaderProvider";

const GlobalLoader = () => {
  const { isLoading } = useLoader();

  // if (!isLoading) return null; // Hide when not loading
  return (
    <div>
      <div className={styles.loader}></div>
      <div className={styles.LoaderBackground}> </div>
    </div>
  );
};

export default GlobalLoader;
