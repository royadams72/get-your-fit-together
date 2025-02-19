import { PreferencesQuestions } from "@/types/enums/preferences.enum";
import { CheckBox } from "@/types/interfaces/form";

export const workoutType = {
  groupName: "workoutType",
  workoutTypeError: "Please select a Preferred Workout Type",

  cardio: (): CheckBox => {
    return {
      // name: PreferencesQuestions.cardio,
      label: "Cardio:",
      value: false,
      // validation: {
      //   required: workoutTypeError,
      // },
      // groupName: workoutTypeName,
    };
  },

  strengthTraining: (): CheckBox => {
    return {
      // name: PreferencesQuestions.strengthTraining,
      label: "Strength Training:",
      value: false,
      // validation: {
      //   required: workoutTypeError,
      // },
      // groupName: workoutTypeName,
    };
  },
};

export const workoutTypeGroup: any[] = [
  { label: "Cardio", value: false },
  { label: "Strength Training", value: false },
  { label: "Yoga", value: false },
  // Add more checkboxes as needed
];
