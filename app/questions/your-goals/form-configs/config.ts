import { YourGoals } from "@/types/enums/your-goals.enum";
import { Select } from "@/types/interfaces/form";

export const config = {
  primaryGoalConfig: <Select>{
    name: YourGoals.primaryGoal,
    label: "Primary Goal:",
    options: [
      { value: "", display: "Select Primary Goal" },
      { value: "lose-weight", display: "Lose Weight (Fat Loss Focus)" },
      {
        value: "build-muscle",
        display: "Build Muscle (Hypertrophy / Strength Focus)",
      },
      { value: "improve-endurance", display: "Improve Endurance & Stamina" },
      {
        value: "increase-flexibility",
        display: "Increase Flexibility & Mobility",
      },
      {
        value: "enhance-athletic-performance",
        display: "Enhance Athletic Performance (Sports-Specific Training)",
      },
      {
        value: "overall-health",
        display: "Improve Overall Health & Longevity",
      },
      {
        value: "rehabilitation",
        display: "Rehabilitation / Recovery (Post-Injury, Joint Health, etc.)",
      },
    ],
    validation: {
      required: "Please select a primary goal",
    },
  },
  secondaryGoalConfig: <Select>{
    name: YourGoals.secondaryGoal,
    label: "Secondary Goal:",
    options: [
      { value: "", display: "Select Secondary Goal" },
      {
        value: "tone-muscles",
        display: "Tone & Define Muscles (Sculpt and enhance muscle visibility)",
      },
      {
        value: "improve-cardio",
        display:
          "Improve Cardiovascular Fitness (Better heart and lung capacity)",
      },
      {
        value: "gain-strength-no-bulk",
        display:
          "Gain Strength Without Bulk (Functional strength training without major size increase)",
      },
      {
        value: "enhance-posture-core",
        display:
          "Enhance Posture & Core Strength (Focus on stability, balance, and alignment)",
      },
      {
        value: "boost-energy",
        display:
          "Boost Energy & Reduce Fatigue (General vitality and well-being)",
      },
      {
        value: "manage-stress",
        display:
          "Manage Stress & Improve Mental Well-being (Mindfulness, stress relief, mental clarity)",
      },
      {
        value: "rehabilitate-injury",
        display:
          "Rehabilitate a Previous Injury (Strengthen weak areas, mobility work)",
      },
    ],
    validation: {
      required: "Please select a secondary goal",
    },
  },
  motivationLevelConfig: <Select>{
    name: YourGoals.motivationLevel,
    label: "Motivation Level:",
    options: [
      { value: "", display: "Select Motivation Level" },
      {
        value: "struggling",
        display:
          "Struggling to Stay Motivated (I find it hard to start and stick with workouts.)",
      },
      {
        value: "need-external",
        display:
          "Need External Motivation (I do better with encouragement, accountability, or a trainer.)",
      },
      {
        value: "moderately-motivated",
        display:
          "Moderately Motivated (I stay consistent but sometimes need a push.)",
      },
      {
        value: "highly-motivated",
        display:
          "Highly Motivated (I am disciplined and stick to my goals with minimal effort.)",
      },
      {
        value: "all-in",
        display:
          "All-In, No Excuses (I am fully committed and always push myself to improve.)",
      },
    ],
    validation: {
      required: "Please select a motivation level",
    },
  },
  targetTimelineConfig: <Select>{
    name: YourGoals.targetTimeline,
    label: "Target Timeline:",
    options: [
      { value: "", display: "Select Target Timeline" },
      { value: "3-months", display: "3 months" },
      { value: "6-months", display: "6 months" },
      { value: "12-months", display: "12 months" },
    ],
    validation: {
      required: "Please select a target timeline",
    },
  },
};
