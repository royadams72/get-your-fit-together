import { CheckBox, Select } from "@/types/interfaces/form";
import { useForm } from "react-hook-form";

export const experienceConfig: Select = {
  name: "experienceLevel",
  lable: "Experience Level",
  options: [
    { value: null, display: "Select an option" },
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

export const alcoholConfig: CheckBox = {
  name: "alcoholConsumption",
  lable: "Alcohol Consumption per week (Units)",
  validation: {
    required: "Please select an option",
  },
  eventHandlers: {},
};
