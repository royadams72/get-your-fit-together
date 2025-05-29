import { ObjectId } from "mongodb";
import { DbResponse } from "../interfaces/api";
import { FitPlan } from "../interfaces/fitness-plan";
import { fitPlanGuard } from "./fitPlanGuard";

export const isDbResponse = (plan: any): plan is DbResponse => {
  const fitPlan: FitPlan = plan?.reduxState?.user?.user?.userFitnessPlan;
  return (
    plan !== null &&
    typeof plan === "object" &&
    "_id" in plan &&
    plan._id instanceof ObjectId &&
    "reduxState" in plan &&
    typeof plan?.reduxState === "object" &&
    "aboutYou" in plan?.reduxState &&
    typeof plan?.reduxState?.aboutYou === "object" &&
    "injuries" in plan?.reduxState &&
    typeof plan?.reduxState?.injuries === "object" &&
    "yourGoals" in plan?.reduxState &&
    typeof plan?.reduxState?.yourGoals === "object" &&
    "preferences" in plan?.reduxState &&
    typeof plan?.reduxState?.preferences === "object" &&
    "user" in plan?.reduxState &&
    typeof plan?.reduxState?.user === "object" &&
    "userFitnessPlan" in plan?.reduxState?.user?.user &&
    fitPlanGuard(fitPlan)
  );
};
