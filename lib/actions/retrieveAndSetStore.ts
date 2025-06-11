"use server";

import { API, JOURNEY_PATHS } from "@/routes.config";
import { FitPlan } from "@/types/interfaces/fitness-plan";

import { cookies } from "next/headers";
import { ENV } from "../services/envService";
import { isNotEmpty } from "../utils/isEmpty";
import { fetchHelper } from "./fetchHelper";
import { RootState, State } from "@/types/interfaces/store";
import { console } from "inspector";

export default async function retrieveAndSetStore() {
  console.log("retrieveAndSetStore: CALLED");
  const cookieStore = await cookies();
  console.log("cookieStore:", cookieStore);
  console.log(
    "!fromPrevPage",
    !cookieStore.get("fromPrevPage")?.value,
    "fromPrevPage val",
    cookieStore.get("fromPrevPage")?.value
  );

  if (!cookieStore.get("fromPrevPage")?.value) return;

  const isFromPrevPage = cookieStore.get("fromPrevPage");
  const sessionCookie = cookieStore.get("sessionCookie");
  // console.log("retrieveAndSetStore", cookieStore?.get("userData"));
  const userData =
    (cookieStore?.get("userData")?.value &&
      JSON.parse(cookieStore.get("userData")?.value as string)) ||
    undefined;
  const isReturningUser = isNotEmpty(userData);
  const retrievData = isReturningUser
    ? userData
    : { sessionCookie: sessionCookie?.value };
  // console.log("sessionCookie:", sessionCookie?.value);

  let fitnessPlanFromAI = {} as FitPlan;
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
    console.log("savedState:::", savedState);

    if (!isReturningUser) {
      // Get fitplan and add to saved data
      fitnessPlanFromAI = await fetchHelper(
        `${ENV.BASE_URL}/${API.GET_PLAN}`,
        savedState
      );
      // add it
      savedState.user.user.userFitnessPlan = fitnessPlanFromAI;
    }
  }
  console.log("savedState in retrieveAndSetStore:", savedState);

  return savedState;
}
