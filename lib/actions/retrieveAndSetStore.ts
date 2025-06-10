import { API } from "@/routes.config";
import { FitPlan } from "@/types/interfaces/fitness-plan";

import { cookies } from "next/headers";
import { ENV } from "../services/envService";
import { isNotEmpty } from "../utils/isEmpty";
import { fetchHelper } from "./fetchHelper";
import { RootState } from "@/types/interfaces/store";

export default async function retrieveAndSetStore() {
  const cookieStore = await cookies();
  const isFromPrevPage = cookieStore.get("fromPrevPage");
  const sessionCookie = cookieStore.get("sessionCookie");
  // console.log("retrieveAndSetStore", cookieStore?.get("userData"));
  const userData =
    (cookieStore?.get("userData")?.value &&
      JSON.parse(cookieStore.get("userData")?.value as string)) ||
    undefined;
  const isReturningUser = isNotEmpty(userData);
  const retrievData = userData
    ? userData
    : { sessionCookie: sessionCookie?.value };
  // console.log("sessionCookie:", sessionCookie?.value);

  // let fitnessPlanFromAI = {} as FitPlan;
  let savedState = {} as RootState;
  // let userFitnessPlan = {} as FitPlan;
  // let retrievedStore = {} as RootState;
  // console.log("retrievData: ", retrievData);

  if (isFromPrevPage?.value) {
    // retrieve the redux store from  mongodb, so we can make a call to create a workout plan
    // Or we are retrieving a saved plan after login
    savedState = await fetchHelper(
      `${ENV.BASE_URL}/${API.RETRIEVE}`,
      retrievData
    );
    // if (isReturningUser) {
    //   userFitnessPlan = savedState.user.user.userFitnessPlan as FitPlan;

    //   // console.log(
    //   //   "userFitnessPlan = savedState.fitnessPlan::",
    //   //   savedState.user.user.userFitnessPlan
    //   // );
    // } else {
    //   // create a workout plan from call to AI
    //   fitnessPlanFromAI = await fetchHelper(
    //     `${ENV.BASE_URL}/${API.GET_PLAN}`,
    //     savedState
    //   );

    //   // console.log("userFitnessPlan = fitnessPlanFromAI::", fitnessPlanFromAI);
    // }
    // console.log("savedState in ret func:", savedState);
  }
  return savedState;
}
