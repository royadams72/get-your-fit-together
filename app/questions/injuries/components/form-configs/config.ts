import { InjuriesQuestions } from "@/types/enums/injuries.enum";
import { Select } from "@/types/interfaces/form";
import {
  foodAllergiesOptions,
  otherSensitivitiesOptions,
  upperBodyOptions,
  lowerBodyOptions,
  generalConditionsOptions,
  medicalRestrictionsOptions,
} from "./options/conditions";

export const foodAllergiesConfig = (): Select => {
  return {
    name: InjuriesQuestions.foodAllergies,
    label: "Food Allergies:",
    options: foodAllergiesOptions,
    validation: {
      required: "Please select an option for food allergies",
    },
  };
};

export const otherSensitivitiesConfig = (): Select => {
  return {
    name: InjuriesQuestions.otherSensitivities,
    label: "Other Sensitivities:",
    options: otherSensitivitiesOptions,
    validation: {
      required: "Please select an option for other sensitivities",
    },
  };
};

export const upperBodyConfig = (): Select => {
  return {
    name: InjuriesQuestions.upperBody,
    label: "Upper Body Issues:",
    options: upperBodyOptions,
    validation: {
      required: "Please select an option for upper body issues",
    },
  };
};

export const lowerBodyConfig = (): Select => {
  return {
    name: InjuriesQuestions.lowerBody,
    label: "Lower Body Issues:",
    options: lowerBodyOptions,
    validation: {
      required: "Please select an option for lower body issues",
    },
  };
};

export const generalConditionsConfig = (): Select => {
  return {
    name: InjuriesQuestions.generalConditions,
    label: "General Conditions:",
    options: generalConditionsOptions,
    validation: {
      required: "Please select an option for general conditions",
    },
  };
};

export const medicalRestrictionsConfig = (): Select => {
  return {
    name: InjuriesQuestions.medicalRestrictions,
    label: "Medical Restrictions:",
    options: medicalRestrictionsOptions,
    validation: {
      required: "Please select an option for medical restrictions",
    },
  };
};
