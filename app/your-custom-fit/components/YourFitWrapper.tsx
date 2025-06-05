import { FitPlan } from "@/types/interfaces/fitness-plan";
import YourFit from "./YourFit";
import { cookies } from "next/headers";
import { fetchHelper } from "@/lib/actions/fetchHelper";
import { API } from "@/routes.config";
import { ENV } from "@/lib/services/envService";
import { isNotEmpty } from "@/lib/utils/isEmpty";
import { RootState } from "@/types/interfaces/store";

const YourFitWrapper = async () => {
  const cookieStore = await cookies();
  const isFromPrevPage = cookieStore.get("fromPrevPage");
  const sessionCookie = cookieStore.get("sessionCookie");
  const userData = JSON.parse(cookieStore.get("userData")?.value as string);
  const isReturningUser = isNotEmpty(userData);
  const retrievData = sessionCookie?.value
    ? { sessionCookie: sessionCookie?.value }
    : userData;
  // console.log("sessionCookie:", sessionCookie?.value);

  let fitnessPlanFromAI = {} as FitPlan;
  let savedState = {} as RootState;
  let userFitnessPlan: any;
  console.log("userData in page.tsx", userData);

  if (isFromPrevPage?.value) {
    // retrieve the redux store from  mongodb, so we can make a call to create a workout plan
    savedState = await fetchHelper(
      `${ENV.BASE_URL}/${API.RETRIEVE}`,
      retrievData
    );
    if (!isReturningUser) {
      // create a workout plan from call to AI
      fitnessPlanFromAI = await fetchHelper(
        `${ENV.BASE_URL}/${API.GET_PLAN}`,
        savedState
      );
    }
    console.log("page.tsx condition executed::");
    userFitnessPlan = isNotEmpty(fitnessPlanFromAI)
      ? fitnessPlanFromAI
      : savedState.user.user.userFitnessPlan;
  }
  console.log("userFitnessPlan before render::", userFitnessPlan);
  return <YourFit userFitnessPlan={userFitnessPlan} />;
};

export default YourFitWrapper;
