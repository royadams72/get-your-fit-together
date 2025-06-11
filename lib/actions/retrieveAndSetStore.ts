"use server";

import { API, PATHS } from "@/routes.config";
import { FitPlan } from "@/types/interfaces/fitness-plan";

import { cookies } from "next/headers";
import { ENV } from "../services/envService";
import { isNotEmpty } from "../utils/isEmpty";
import { fetchHelper } from "./fetchHelper";
import { RootState } from "@/types/interfaces/store";
import { redirect } from "next/navigation";
import { isAnyFieldEmpty } from "../utils/isAnyFieldEmpty";

export default async function retrieveAndSetStore() {
  const cookieStore = await cookies();

  if (!cookieStore.get("fromPrevPage")?.value) return;

  const sessionCookie = cookieStore.get("sessionCookie");
  const userData =
    (cookieStore?.get("userData")?.value &&
      JSON.parse(cookieStore.get("userData")?.value as string)) ||
    undefined;

  const isReturningUser = isNotEmpty(userData);
  const retrievData = isReturningUser
    ? userData
    : { sessionCookie: sessionCookie?.value };

  let fitnessPlanFromAI = {} as FitPlan;
  let savedState = {} as RootState;

  // retrieve the redux store from  mongodb, so we can make a call to create a workout plan
  // Or we are retrieving a saved plan after login
  savedState = await fetchHelper(
    `${ENV.BASE_URL}/${API.RETRIEVE}`,
    retrievData
  );

  // Redirect if savedState is invalid (missing any field except 'user')
  const { user, ...savedStateToCheck } = savedState;
  const isInvalid = isAnyFieldEmpty(savedStateToCheck);

  if (isInvalid) {
    redirect(PATHS.ABOUT_YOU);
  }

  if (!isReturningUser) {
    // Get fitplan and add to saved data
    fitnessPlanFromAI = await fetchHelper(
      `${ENV.BASE_URL}/${API.GET_PLAN}`,
      savedState
    );
    // add it
    savedState.user.user.userFitnessPlan = fitnessPlanFromAI;
  }

  return savedState;
}
