import React, { useState } from "react";

import {
  daysObject,
  FitPlan,
  TipsObject,
} from "@/types/interfaces/fitness-plan";

import styles from "@/styles/components/_accordionPanel.module.scss";

import ScheduleComponent from "./ScheduleComponent";
import TipsComponent from "./TipsComponent";
import AccordionPanel from "@/components/AccordionPanel";

const Accordion: React.FC<{ plan: FitPlan }> = ({ plan }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className={styles.accordion}>
      <AccordionPanel
        title={plan?.overview?.title as string}
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        <p>{plan?.overview?.copy}</p>
      </AccordionPanel>
      <AccordionPanel
        title={plan?.weeklySchedule?.title as string}
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        <ScheduleComponent days={plan?.weeklySchedule?.days as daysObject[]} />
      </AccordionPanel>
      <AccordionPanel
        title={plan?.nutritionLifestyleTips?.title as string}
        isActive={activeIndex === 2}
        onShow={() => setActiveIndex(2)}
      >
        <TipsComponent
          tips={plan?.nutritionLifestyleTips?.tips as TipsObject[]}
        />
      </AccordionPanel>
      <AccordionPanel
        title={plan?.conclusion?.title as string}
        isActive={activeIndex === 3}
        onShow={() => setActiveIndex(3)}
      >
        <p>{plan?.conclusion?.copy}</p>
      </AccordionPanel>
    </section>
  );
};

export default Accordion;
