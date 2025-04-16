import React from "react";
import styles from "@/styles/components/_accordionPanel.module.scss";

interface AccordionPanelProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onShow: () => void;
}
const AccordionPanel = ({
  title,
  children,
  isActive,
  onShow,
}: AccordionPanelProps) => {
  // isActive = true;
  return (
    <section className={styles.accordionPanel}>
      <div className={styles.accordionPanelTitle}>
        <h3 onClick={onShow}>{title}</h3>
        <span className={styles.accordionPanelTitleArrow}></span>
      </div>
      <p
        className={`${
          isActive
            ? styles.accordionPanelIsActive
            : styles.accordionPanelNotActive
        }`}
      >
        <span>{children}</span>
      </p>
    </section>
  );
};

export default AccordionPanel;
