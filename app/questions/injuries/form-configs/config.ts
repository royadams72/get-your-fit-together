import { Injuries } from "@/types/enums/injuries.enum";
import { Select } from "@/types/interfaces/form";
import {
  foodAllergiesOptions,
  otherSensitivitiesOptions,
  upperBodyOptions,
  lowerBodyOptions,
  generalConditionsOptions,
  medicalRestrictionsOptions,
} from "./options/conditions";

export const config = {
  upperBodyConfig: <Select>{
    name: Injuries.upperBody,
    label: "Upper Body Issues:",
    options: upperBodyOptions,
    validation: {
      required: "Please select an option for upper body issues",
    },
  },
  lowerBodyConfig: <Select>{
    name: Injuries.lowerBody,
    label: "Lower Body Issues:",
    options: lowerBodyOptions,
    validation: {
      required: "Please select an option for lower body issues",
    },
  },
  generalConditionsConfig: <Select>{
    name: Injuries.generalConditions,
    label: "General Conditions:",
    options: generalConditionsOptions,
    validation: {
      required: "Please select an option for general conditions",
    },
  },
  medicalRestrictionsConfig: <Select>{
    name: Injuries.medicalRestrictions,
    label: "Medical Restrictions:",
    options: medicalRestrictionsOptions,
    validation: {
      required: "Please select an option for medical restrictions",
    },
  },
  foodAllergiesConfig: <Select>{
    name: Injuries.foodAllergies,
    label: "Food Allergies:",
    options: foodAllergiesOptions,
    validation: {
      required: "Please select an option for food allergies",
    },
  },
  otherSensitivitiesConfig: <Select>{
    name: Injuries.otherSensitivities,
    label: "Other Sensitivities:",
    options: otherSensitivitiesOptions,
    validation: {
      required: "Please select an option for other sensitivities",
    },
  },
};
