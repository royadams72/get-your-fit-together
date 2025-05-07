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
  const setActiveStyles = (styleName?: string) => {
    if (!styleName) {
      return isActive
        ? styles.accordionPanelActive
        : styles.accordionPanelNotActive;
    }
    const activeClass = `accordionPanel${styleName}Active`;
    const notActiveClass = `accordionPanel${styleName}NotActive`;

    return isActive ? styles[activeClass] : styles[notActiveClass];
  };

  return (
    <section className={styles.accordionPanel} ref={ref}>
      <div className={setActiveStyles("Title")}>
        <h3 onClick={onShow}>{title}</h3>
        <span className={setActiveStyles("Arrow")}></span>
      </div>
      <section className={setActiveStyles()}>{children}</section>
    </section>
  );
};

export default AccordionPanel;
