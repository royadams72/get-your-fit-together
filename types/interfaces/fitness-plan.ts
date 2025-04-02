import { FitnessPlan } from "../enums/fitness-plan.enum";

export interface FitPlan {
  [FitnessPlan.overview]: TextSection;
  [FitnessPlan.weeklySchedule]: WeeklySchedule;
  [FitnessPlan.nutritionLifestyleTips]: NutritionAndTips;
  [FitnessPlan.conclusion]: TextSection;
}

export interface TextSection {
  [FitnessPlan.title]: string;
  [FitnessPlan.copy]: string;
}

export interface WeeklySchedule {
  [FitnessPlan.title]: string;
  [FitnessPlan.days]: {
    [FitnessPlan.day]: string;
    [FitnessPlan.title]: string;
    [FitnessPlan.exercises]: Exercises[];
  }[];
}

export interface Exercises {
  [FitnessPlan.exercise]: string;
  [FitnessPlan.action]: string;
  [FitnessPlan.video]?: string;
}

export interface NutritionAndTips {
  [FitnessPlan.title]: string;
  [FitnessPlan.tips]: {
    [FitnessPlan.tip]: string;
    [FitnessPlan.action]: string;
  }[];
}
