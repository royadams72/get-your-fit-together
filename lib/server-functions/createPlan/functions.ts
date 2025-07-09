import { AboutYouState } from "@/types/interfaces/about-you";
import { InjuriesState } from "@/types/interfaces/injuries";
import { PreferencesState } from "@/types/interfaces/preferences";
import { RootState } from "@/types/interfaces/store";
import { YourGoalsState } from "@/types/interfaces/your-goals";

interface SessionStore {
  aboutYou: AboutYouState;
  injuries: InjuriesState;
  yourGoals: YourGoalsState;
  preferences: PreferencesState;
}
export const extractState = (state: RootState) => {
  const { aboutYou, injuries, yourGoals, preferences } = state;

  return { aboutYou, injuries, yourGoals, preferences };
};
export const setContent = async (store: SessionStore) => {
  const {
    aboutYou: {
      aboutYou: {
        activityLevel,
        age,
        alcoholConsumption,
        bodyType,
        experienceLevel,
        gender,
        height,
        stressLevel,
        smoking,
        weight,
      },
    },
    injuries: {
      injuries: {
        foodAllergies,
        generalConditions,
        lowerBody,
        medicalRestrictions,
        otherSensitivities,
        upperBody,
      },
    },
    preferences: {
      preferences: {
        daysPerWeek,
        equipmentAvailability,
        timePerSession,
        workoutType,
      },
    },
    yourGoals: {
      yourGoals: {
        motivationLevel,
        primaryGoal,
        secondaryGoal,
        targetTimeline,
      },
    },
  } = store;

  const aboutMe = `About me:
  - Gender: ${gender}
  - Age: ${age} years
  - Height: ${height}
  - Weight: ${weight}
  - Body Type: ${bodyType}
  - Experience Level: ${experienceLevel}
  - Activity Level: ${activityLevel}
  - Alcohol Consumption: ${alcoholConsumption}
  - Smoking: ${smoking}
  - Stress Level: ${stressLevel}`;

  const injuries = `Injuries and Conditions:
  - Upper Body Injuries: ${upperBody}
  - Lower Body Injuries: ${lowerBody}
  - General Conditions: ${generalConditions}
  - Medical Restrictions: ${medicalRestrictions}
  - Food Allergies: ${foodAllergies}
  - Other Sensitivities: ${otherSensitivities}`;

  const preferences = `Preferences:
  - Types of prefered workouts: ${workoutType.join(",")}
  - Days per Week: ${daysPerWeek}
  - Time per Session: ${timePerSession} minutes
  - Equipment Availability: ${equipmentAvailability}`;

  const goals = `Your Goals:
  - Primary Goal: ${primaryGoal}
  - Secondary Goal: ${secondaryGoal}
  - Target Timeline: ${targetTimeline} months
  - Motivation Level: ${motivationLevel}`;

  const content = `${aboutMe}\n\n${injuries}\n\n${preferences}\n\n${goals}`;

  return content;
};
