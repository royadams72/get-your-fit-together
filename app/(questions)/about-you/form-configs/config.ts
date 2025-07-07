import { AboutYou } from "@/types/enums/about-you.enum";
import { Radio, Select } from "@/types/interfaces/form";
import { heightTogglgOptions } from "@/app/(questions)/about-you/form-configs/options/height";
import { weightTogglgOptions } from "@/app/(questions)/about-you/form-configs/options/weight";
import {
  experienceLevelOptions,
  bodyTypeOptions,
} from "@/app/(questions)/about-you/form-configs/options/aboutYou";

export const yesNoRadioOptions = [
  { value: "yes", label: "Yes", id: "yes" },
  { value: "no", label: "No", id: "no" },
];

export const config = {
  experienceConfig: <Select>{
    name: AboutYou.experienceLevel,
    label: "Experience Level",
    options: experienceLevelOptions,
    validation: {
      required: "Please select an option for experience",
    },
  },
  genderConfig: <Radio>{
    name: AboutYou.gender,
    legend: "Gender:",
    options: [
      {
        value: "male",
        label: "Male",
        id: "male",
      },
      {
        value: "female",
        label: "Female",
        id: "female",
      },
    ],
    validation: {
      required: "Please select an option for gender",
    },
  },
  ageConfig: <Select>{
    name: AboutYou.age,
    label: "Age:",
    options: [
      { value: "", display: "Select your age" },
      { value: "18-24", display: "18-24" },
      { value: "25-34", display: "25-34" },
      { value: "35-44", display: "35-44" },
      { value: "45-54", display: "45-54" },
      { value: "55+", display: "55+" },
    ],
    validation: {
      required: "Please select an option for age",
    },
  },
  heightConfig: <Select>{
    name: AboutYou.height,
    label: "Height:",
    toggleOptions: heightTogglgOptions,
    validation: {
      required: "Please select an option for height",
    },
  },
  weightConfig: <Select>{
    name: AboutYou.weight,
    label: "Weight:",
    toggleOptions: weightTogglgOptions,
    validation: {
      required: "Please select an option for weight",
    },
  },
  bodyTypeConfig: <Select>{
    name: AboutYou.bodyType,
    label: "Body Type:",
    options: bodyTypeOptions,
    validation: {
      required: "Please select an option for weight body type",
    },
  },
  stressLevelConfig: <Select>{
    name: AboutYou.stressLevel,
    label: "Stress Level:",
    options: [
      { value: "", display: "Select Stress Level" },
      { value: "low", display: "Low (Relaxed, No major stress)" },
      { value: "moderate", display: "Moderate (Work/Life Stress, Manageable)" },
      { value: "high", display: "High (Frequently Stressed, Sleep Disrupted)" },
      {
        value: "very-high",
        display: "Very High (Chronic Stress, Affects Mood & Health)",
      },
    ],
    validation: {
      required: "Please select an option for stress level",
    },
  },
  smokingConfig: <Radio>{
    name: AboutYou.smoking,
    legend: "Do you smoke?",
    options: yesNoRadioOptions,
    validation: {
      required: "Please select an option for smoking",
    },
  },
  alcoholConsumptionConfig: <Select>{
    name: AboutYou.alcoholConsumption,
    label: "Alcohol Consumption per week (Units):",
    options: [
      { value: "", display: "Select Alcohol Consumption" },
      { value: "none", display: "None" },
      { value: "1-10", display: "1-10" },
      { value: "10-20", display: "10-20" },
      { value: "20-30", display: "20-30" },
      { value: "30-40", display: "30-40" },
      { value: "40+", display: "40+" },
    ],
    validation: {
      required: "Please select an option for alcohol consumption",
    },
  },
  activityLevelConfig: <Select>{
    name: AboutYou.activityLevel,
    label: "Activity Level:",
    options: [
      { value: "", display: "Select Activity Level" },
      {
        value: "sedentary",
        display:
          "Sedentary (Little to no daily movement – desk job, minimal activity)",
      },
      {
        value: "lightly-active",
        display:
          "Lightly Active (Daily walking, light activity, occasional exercise 1-2x per week)",
      },
      {
        value: "moderately-active",
        display:
          "Moderately Active (Exercise 3-5 times a week, or an active job/movement throughout the day)",
      },
      {
        value: "very-active",
        display:
          "Very Active (Intense workouts 6+ times a week, or physically demanding job)",
      },
      { value: "athlete", display: "Athlete / Highly Active (Professional)" },
    ],
    validation: {
      required: "Please select an option for activity level",
    },
  },
};
