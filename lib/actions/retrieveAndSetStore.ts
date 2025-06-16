import { API, PATHS } from "@/routes.config";
import { FitPlan } from "@/types/interfaces/fitness-plan";

import { cookies } from "next/headers";
import { ENV } from "../services/envService";
import { isNotEmpty } from "../utils/isEmpty";
import { fetchHelper } from "./fetchHelper";
import { RootState } from "@/types/interfaces/store";

import { isAnyFieldEmpty } from "../utils/isAnyFieldEmpty";
import { redirectIf } from "../utils/redirectIf";
import { getRedisData } from "../db/redis";
import cookieAction from "./cookie.action";
import { CookieAction, Cookie } from "@/types/enums/cookie.enum";

export default async function retrieveAndSetStore() {
  // if (!cookieStore.get("fromPrevPage")?.value) return;
  const sessionCookie = (await cookieAction(CookieAction.get, [
    Cookie.sessionCookie,
  ])) as string;
  // const userData =
  //   (cookieStore?.get("userData")?.value &&
  //     JSON.parse(cookieStore.get("userData")?.value as string)) ||
  //   undefined;

  // const isReturningUser = isNotEmpty(userData);
  // const retrievData = isReturningUser
  //   ? userData
  //   : { sessionCookie: sessionCookie?.value };

  const data = await fetch(`${ENV.BASE_URL}/${API.GET_REDIS}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const savedState = await data.json();
  // const state = JSON.parse(savedState);
  const {
    preferences: { preferences },
    uiData: {
      uiData: { isRetrieving },
    },
  } = savedState as RootState;
  console.log("retrieveAndSetStore::", preferences);

  // console.log("isReturningUser", isNotEmpty(userData), "userData:", userData);
  // let savedState = {} as RootState | any;

  // retrieve the redux store from  mongodb, so we can make a call to create a workout plan
  // Or we are retrieving a saved plan after login

  if (!isRetrieving) {
    // Get fitplan and add to saved data
    const fitnessPlanFromAI = await fetchHelper(
      `${ENV.BASE_URL}/${API.GET_PLAN}`,
      savedState
    );
    // add it
    // console.log("fitnessPlanFromAI", fitnessPlanFromAI);
    savedState.user.user.userFitnessPlan = fitnessPlanFromAI;
    // console.log("savedState", savedState);
  }
  // return {};
  return savedState;
}
