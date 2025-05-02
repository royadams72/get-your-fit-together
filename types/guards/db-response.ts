import { ObjectId } from "mongodb";
import { DbResponse } from "../interfaces/api";
import { isNotEmpty } from "@/lib/utils/validation";

export const isDbResponse = (plan: any): plan is DbResponse => {
  return (
    plan !== null &&
    typeof plan === "object" &&
    "_id" in plan &&
    plan._id instanceof ObjectId && // Assuming _id is an ObjectId instance
    "reduxState" in plan &&
    typeof plan.reduxState === "object" &&
    "aboutYou" in plan.reduxState &&
    typeof plan.reduxState.aboutYou === "object" &&
    "injuries" in plan.reduxState &&
    typeof plan.reduxState.injuries === "object" &&
    "yourGoals" in plan.reduxState &&
    typeof plan.reduxState.yourGoals === "object" &&
    "preferences" in plan.reduxState &&
    typeof plan.reduxState.preferences === "object" &&
    "user" in plan.reduxState &&
    typeof plan.reduxState.user === "object" &&
    "userFitnessPlan" in plan.reduxState.user.user &&
    isNotEmpty(plan.reduxState.user.user.userFitnessPlan)
  );
};
