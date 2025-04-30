import React from "react";
import styles from "@/styles/components/_accordionPanel.module.scss";

interface AccordionPanelProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  ref?: (el: any) => any;
  onShow: () => void;
}
const AccordionPanel = ({
  title,
  children,
  isActive,
  ref,
  onShow,
}: AccordionPanelProps) => {
  return (
    <section className={styles.accordionPanel} ref={ref}>
      <div className={styles.accordionPanelTitle}>
        <h3 onClick={onShow}>{title}</h3>
        <span
          className={`${
            isActive
              ? styles.accordionPanelTitleArrow
              : styles.accordionPanelTitleArrowActive
          }`}
        ></span>
      </div>
      <section
        className={`${
          isActive
            ? styles.accordionPanelIsActive
            : styles.accordionPanelNotActive
        }`}
      >
        {children}
      </section>
    </section>
  );
};

export default AccordionPanel;
