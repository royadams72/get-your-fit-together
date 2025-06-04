import { FitPlan } from "@/types/interfaces/fitness-plan";
import YourFit from "./YourFit";
import { cookies } from "next/headers";
import { fetchHelper } from "@/lib/actions/fetchHelper";
import { API } from "@/routes.config";
import { ENV } from "@/lib/services/envService";
import { Suspense } from "react";

const YourFitWrapper = async () => {
  const cookieStore = await cookies();
  // const isFromPrevPage = cookieStore.get("fromPrevPage");
  const sessionCookie = cookieStore.get("sessionCookie");
  // console.log("sessionCookie:", sessionCookie?.value);

  // let userFitnessPlan: ;
  const savedState = await fetchHelper(`${ENV.BASE_URL}/${API.RETRIEVE}`, {
    sessionCookie: sessionCookie?.value,
  });
  const userFitnessPlan: FitPlan = await fetchHelper(
    `${ENV.BASE_URL}/${API.GET_PLAN}`,
    savedState
  );
  console.log("savedState in page::", userFitnessPlan);

  // console.log("userFitnessPlan:::", userFitnessPlan);

  // } catch (error) {}
  // userFitnessPla{userFitnessPlan}
  return (
    <Suspense fallback={"...Loading"}>
      <YourFit userFitnessPlan={userFitnessPlan} />;
    </Suspense>
  );
};

export default YourFitWrapper;
