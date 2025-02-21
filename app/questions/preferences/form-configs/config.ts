import { CheckBoxGroup, Select } from "@/types/interfaces/form";
import { PreferencesQuestions } from "@/types/enums/preferences.enum";
import {
  daysOptions,
  equipmentOptions,
  socialPreferenceOptions,
  timeOptions,
  workoutCheckboxes,
  workoutTimeOptions,
} from "@/app/questions/preferences/form-configs/options/options";

export const config = {
  workoutType: <CheckBoxGroup>{
    name: PreferencesQuestions.preferredWorkoutType,
    hint: {
      __html:
        "(What types of workouts do you enjoy or prefer?)<br>Select all that apply",
    },
    legend: "Preferred Workout Type",
    requiredError: "Please select a Preferred Workout Type",
    checkboxes: workoutCheckboxes,
  },
  equipment: <Select>{
    name: PreferencesQuestions.equipmentAvailability,
    label: "Equipment Availability",
    options: equipmentOptions,
    validation: {
      required:
        "Please select an option for what equipment you have access to.",
    },
  },
  timePerSession: <Select>{
    name: PreferencesQuestions.timePerSession,
    label: "Time per Session",
    options: timeOptions,
    validation: {
      required: "Please select an option for time per session.",
    },
  },
  daysPerWeek: <Select>{
    name: PreferencesQuestions.daysPerWeek,
    label: "Days per Week",
    options: daysOptions,
    validation: {
      required: "Please select an option for days per week.",
    },
  },
  preferredWorkoutTime: <Select>{
    name: PreferencesQuestions.workoutTime,
    label: "Preferred Workout Time",
    options: workoutTimeOptions,
    validation: {
      required: "Please select an option for preferred workout time.",
    },
  },
  socialPreference: <Select>{
    name: PreferencesQuestions.socialPreference,
    label: "Social Preference",
    options: socialPreferenceOptions,
    validation: {
      required: "Please select an option for social preference.",
    },
  },
};
