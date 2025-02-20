import { CheckBoxGroup } from "@/types/interfaces/form";

export const workoutType: CheckBoxGroup = {
  name: "workoutType",
  requiredError: "Please select a Preferred Workout Type",
  checkboxes: [
    { label: "Cardio", value: false },
    { label: "Strength Training", value: false },
    { label: "Yoga", value: false },
  ],
};
