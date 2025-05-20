import React, { useEffect, useRef, useState } from "react";

import {
  daysObject,
  FitPlan,
  TipsObject,
} from "@/types/interfaces/fitness-plan";

import styles from "@/styles/components/_accordionPanel.module.scss";

import ScheduleComponent from "@/components/display-plan/ScheduleComponent";
import TipsComponent from "@/components/display-plan/TipsComponent";
import AccordionPanel from "@/components/AccordionPanel";

const Accordion: React.FC<{ plan: FitPlan }> = ({ plan }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const myRefs = useRef<(any | null)[]>([]);

  useEffect(() => {
    if (myRefs.current[activeIndex]) {
      const topOffset = 300;
      myRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.scrollBy(0, -topOffset);
    }
  }, [activeIndex]);

  return (
    <section className={styles.accordion}>
      <AccordionPanel
        ref={(el: any) => (myRefs!.current[0] = el)}
        title={plan?.overview?.title as string}
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        <p>{plan?.overview?.copy}</p>
      </AccordionPanel>
      <AccordionPanel
        ref={(el: any) => (myRefs!.current[1] = el)}
        title={plan?.weeklySchedule?.title as string}
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        <ScheduleComponent days={plan?.weeklySchedule?.days as daysObject[]} />
      </AccordionPanel>
      <AccordionPanel
        ref={(el: any) => (myRefs!.current[2] = el)}
        title={plan?.nutritionLifestyleTips?.title as string}
        isActive={activeIndex === 2}
        onShow={() => setActiveIndex(2)}
      >
        <TipsComponent
          tips={plan?.nutritionLifestyleTips?.tips as TipsObject[]}
        />
      </AccordionPanel>
      <AccordionPanel
        ref={(el: any) => (myRefs!.current[3] = el)}
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
