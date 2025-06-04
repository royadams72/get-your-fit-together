import { FitPlan } from "@/types/interfaces/fitness-plan";
import YourFit from "./components/YourFit";
import { cookies } from "next/headers";

const YourCustomFit = async () => {
  const cookieStore = await cookies();
  const isFromPrevPage = cookieStore.get("fromPrevPage");
  console.log("fromPrevPage:", isFromPrevPage);

  // let userFitnessPlan: FitPlan;
  // try {
  //   userFitnessPlan: FitPlan = await fetchHelper(API.GET_PLAN, savedState);
  // } catch (error) {}
  // userFitnessPla{userFitnessPlan}
  return <YourFit />;
};

export default YourCustomFit;
