import { FitPlan } from "@/types/interfaces/fitness-plan";
import YourFit from "./YourFit";
import { cookies } from "next/headers";
import { fetchHelper } from "@/lib/actions/fetchHelper";
import { API } from "@/routes.config";
import { ENV } from "@/lib/services/envService";
import { isNotEmpty } from "@/lib/utils/isEmpty";
import { RootState } from "@/types/interfaces/store";

const YourFitWrapper = async () => {
  // userFitnessPlan = isNotEmpty(fitnessPlanFromAI)
  //   ? fitnessPlanFromAI
  //   : savedState.user.user.userFitnessPlan;

  // retrievedStore={retrievedStore}
  // userFitnessPlan={userFitnessPlan}

  return <YourFit />;
};

export default YourFitWrapper;
