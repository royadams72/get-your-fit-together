import { AboutYouQuestions } from "@/types/enums/about-you.enum";
import { CheckBox, Radio, Select } from "@/types/interfaces/form";
import {
  heightOptionsFt,
  heightTogglgOptions,
  HeightUnit,
  units,
} from "./heightOptions";

export const experienceConfig = (): Select => {
  return {
    name: AboutYouQuestions.experienceLevel,
    label: "Experience Level",
    options: [
      { value: "", display: "Select an option" },
      {
        value: "beginner",
        display:
          "Beginner (Never worked out before or starting fresh after a long break)",
      },
      {
        value: "novice",
        display:
          "Novice (Some experience but not consistent, still learning proper technique)",
      },
      {
        value: "intermediate",
        display:
          "Intermediate (Regular exerciser, comfortable with workouts but still improving skills)",
      },
      {
        value: "advanced",
        display:
          "Advanced (Highly experienced, confident in training methods and form)",
      },
      {
        value: "Athlete",
        display:
          "Athlete / Professional (Sports-specific or highly skilled fitness level)",
      },
    ],
    hint: { text: "this is a hint" },
    validation: {
      required: "Please select an option",
    },
    eventHandlers: { onChange: (e) => console.log("changed") },
  };
};

export const ageConfig: Select = {
  name: AboutYouQuestions.age,
  label: "Age:",
  options: [
    { value: "18-24", display: "18-24" },
    { value: "25-34", display: "25-34" },
    { value: "35-44", display: "35-44" },
    { value: "45-54", display: "45-54" },
    { value: "55+", display: "55+" },
  ],
  validation: {
    required: "Please select an option for age",
  },
};

export const heightConfig = ({ unit }: { unit?: HeightUnit }): Select => {
  return {
    name: AboutYouQuestions.height,
    label: "Height:",
    options: heightOptionsFt,
    toggleOptions: heightTogglgOptions,
    validation: {
      required: "Please select an option for height",
    },
  };
};

export const genderConfig: Radio = {
  name: AboutYouQuestions.gender,
  legend: "Gender:",
  options: [
    { value: "male", label: "Male", id: "male" },
    { value: "female", label: "Female", id: "female" },
  ],
  validation: {
    required: "Please select an option for gender",
  },
};

export const alcoholConfig: CheckBox = {
  name: AboutYouQuestions.alcoholConsumption,
  label: "Alcohol Consumption per week (Units)",
  validation: {
    required: "Please select an option for alcohol consumption",
  },
};
