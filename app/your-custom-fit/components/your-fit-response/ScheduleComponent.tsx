import React from "react";
import styles from "@/styles/components/_schedule.module.scss";
import { daysObject } from "@/types/interfaces/fitness-plan";
import Button from "@/components/Button";

const ScheduleComponent: React.FC<{ days: daysObject[] }> = ({ days }) => {
  return (
    <div className={styles.schedule}>
      <ul>
        {days?.map((day) => (
          <li key={day.day}>
            <h3>{day.day}</h3>
            <h4>{day.title}</h4>
            <ul className={styles.scheduleExercises}>
              {day?.exercises.map((e, i) => (
                <li key={i}>
                  <div>
                    <strong>{`Exercise ${i + 1}`}: </strong>
                    {e.exercise}
                  </div>

                  {e.video ? (
                    <Button external={true} href={e.video}>
                      Watch video
                    </Button>
                  ) : (
                    <div>
                      <strong>Action: </strong>
                      {e.action}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleComponent;
