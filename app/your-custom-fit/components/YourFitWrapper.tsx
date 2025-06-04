import { FitPlan } from "@/types/interfaces/fitness-plan";
import YourFit from "./YourFit";
import { cookies } from "next/headers";
import { fetchHelper } from "@/lib/actions/fetchHelper";
import { API } from "@/routes.config";
import { ENV } from "@/lib/services/envService";

const YourFitWrapper = async () => {
  const cookieStore = await cookies();
  const isFromPrevPage = cookieStore.get("fromPrevPage");
  const sessionCookie = cookieStore.get("sessionCookie");
  // console.log("sessionCookie:", sessionCookie?.value);

  let userFitnessPlan = {} as FitPlan;
  console.log("isFromPrevPage in page.tsx", isFromPrevPage);

  if (isFromPrevPage?.value) {
    const savedState = await fetchHelper(`${ENV.BASE_URL}/${API.RETRIEVE}`, {
      sessionCookie: sessionCookie?.value,
    });
    userFitnessPlan = await fetchHelper(
      `${ENV.BASE_URL}/${API.GET_PLAN}`,
      savedState
    );
    console.log("page.tsx condition executed::");
  }

  // console.log("userFitnessPlan:::", userFitnessPlan);

  // } catch (error) {}
  // userFitnessPla{userFitnessPlan}
  return <YourFit userFitnessPlan={userFitnessPlan} />;
};

export default YourFitWrapper;
