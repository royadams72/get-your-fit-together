import React from "react";
import styles from "@/styles/components/_schedule.module.scss";
import { TipsObject } from "@/types/interfaces/fitness-plan";

const TipsComponent: React.FC<{ tips: TipsObject[] }> = ({ tips }) => {
  return (
    <div className={styles.schedule}>
      <ul>
        {tips.map((tip) => (
          <li key={tip.tip}>
            <h4>{tip.tip}</h4>
            <p>{tip.action}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TipsComponent;
