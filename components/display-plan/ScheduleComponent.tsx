import React from "react";
import styles from "@/styles/components/_schedule.module.scss";
import { daysObject } from "@/types/interfaces/fitness-plan";
import { youtubeLinks } from "./youTubeLinks";
import Link from "next/link";

const ScheduleComponent: React.FC<{ days: daysObject[] }> = ({ days }) => {
  const getYouTubeLinks = (exercise: string) => {
    const linkObject = youtubeLinks.find((obj) =>
      obj.keywords.some((keyword) => {
        const exerciseWithoutSpaces = exercise
          .replace(/\s+/g, "")
          .toLowerCase(); // Remove all spaces
        const keywordWithoutSpaces = keyword.replace(/\s+/g, "").toLowerCase(); // Remove all spaces from keyword

        // Match the exercise with the keyword (both with spaces removed)
        return exerciseWithoutSpaces.includes(keywordWithoutSpaces);
      })
    );

    return (
      linkObject && (
        <Link href={linkObject.url} target="_blank" rel="noopener noreferrer">
          View Video
        </Link>
      )
    );
  };

  return (
    <div className={styles.schedule}>
      <ul>
        {days?.map((day) => (
          <li key={day.day}>
            <h3>{day.day}</h3>
            <h4>{day.title}</h4>
            <div className={styles.scheduleExercises}>
              <ul>
                {day?.exercises?.map((e, i) => (
                  <li key={i}>
                    <div>
                      <strong>{`Exercise ${i + 1}`}: </strong>

                      {e.exercise}
                    </div>

                    <div>
                      <strong>Action: </strong>
                      <p>{e.action}</p>
                      <b />
                      {getYouTubeLinks(e.exercise)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleComponent;
