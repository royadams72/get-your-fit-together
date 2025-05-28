import React from "react";
import styles from "./_loader.module.scss";
import { useLoader } from "./LoaderProvider";

const GlobalLoader = () => {
  const { isLoading } = useLoader();
  if (!isLoading) return null;

  return (
    <>
      <div className={styles.loader}>
        <h3 className={styles.loaderCopy1}>Loading</h3>
        <h3 className={styles.loaderCopy2}>Creating Plan</h3>
        <h3 className={styles.loaderCopy3}>Nearly there</h3>
        <div className={styles.loaderAnim}></div>
        <h4 style={{ marginTop: "10px" }}>
          Plan creation can take a while, so please be patient.
        </h4>
      </div>
    </>
  );
};

export default GlobalLoader;
