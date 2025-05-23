import { isNotEmpty } from "@/lib/utils/isEmpty";
import { FitPlan } from "../interfaces/fitness-plan";

export const fitPlanGuard = (plan: FitPlan): plan is FitPlan => {
  return (
    typeof plan.overview === "object" &&
    isNotEmpty(plan.overview) &&
    typeof plan.weeklySchedule === "object" &&
    isNotEmpty(plan.weeklySchedule) &&
    typeof plan.nutritionLifestyleTips === "object" &&
    isNotEmpty(plan.nutritionLifestyleTips) &&
    typeof plan.conclusion === "object" &&
    isNotEmpty(plan.conclusion)
  );
};
