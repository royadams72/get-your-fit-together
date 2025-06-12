import { API } from "@/routes.config";
import { FitPlan } from "@/types/interfaces/fitness-plan";

import { cookies } from "next/headers";
import { ENV } from "../services/envService";
import { isNotEmpty } from "../utils/isEmpty";
import { fetchHelper } from "./fetchHelper";
import { RootState } from "@/types/interfaces/store";

import { isAnyFieldEmpty } from "../utils/isAnyFieldEmpty";
import { redirectIf } from "../utils/redirectIf";

export default async function retrieveAndSetStore() {
  const cookieStore = await cookies();

  // if (!cookieStore.get("fromPrevPage")?.value) return;
  const sessionCookie = cookieStore.get("sessionCookie");
  const userData =
    (cookieStore?.get("userData")?.value &&
      JSON.parse(cookieStore.get("userData")?.value as string)) ||
    undefined;

  const isReturningUser = isNotEmpty(userData);
  const retrievData = isReturningUser
    ? userData
    : { sessionCookie: sessionCookie?.value };

  console.log("isReturningUser", isNotEmpty(userData), "userData:", userData);
  let fitnessPlanFromAI = {} as FitPlan;
  let savedState = {} as RootState | any;

  // retrieve the redux store from  mongodb, so we can make a call to create a workout plan
  // Or we are retrieving a saved plan after login
  savedState = await fetchHelper(
    `${ENV.BASE_URL}/${API.RETRIEVE}`,
    retrievData
  );
  redirectIf(savedState.message === "no data recieved");

  const { user, _persist, uiData, journey, ...savedStateToCheck } = savedState;
  console.log(
    "savedStateToCheck",
    savedStateToCheck,
    "isAnyFieldEmpty(savedStateToCheck):",
    isAnyFieldEmpty(savedStateToCheck)
  );
  redirectIf(isAnyFieldEmpty(savedStateToCheck));

  if (!isReturningUser) {
    // Get fitplan and add to saved data
    fitnessPlanFromAI = await fetchHelper(
      `${ENV.BASE_URL}/${API.GET_PLAN}`,
      savedState
    );
    // add it
    console.log("fitnessPlanFromAI", fitnessPlanFromAI);
    savedState.user.user.userFitnessPlan = fitnessPlanFromAI;
    console.log("savedState", savedState);
  }

  return savedState;
}
