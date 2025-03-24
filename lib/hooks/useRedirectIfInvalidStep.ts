import { JOURNEY_PATHS } from "@/routes.config";

import { useEffect, useState } from "react";
import { getJourneyData, navigate } from "../features/journey/journeySlice";
import { isNotEmpty } from "../utils/validation";
import { JourneyData } from "@/types/interfaces/journey";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import { usePathname, useRouter } from "next/navigation";

const useRedirectIfInvalidStep = () => {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useAppDispatch();

  const journeyData: JourneyData[] = useAppSelector(getJourneyData);

  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    const canNavigate = isNotEmpty(
      journeyData.find(
        (route) => route.name === path && route.canNavigate === true
      )
    );
    console.log("canNavigate", canNavigate);

    const lastCompletedRoute = journeyData.findLast(
      (route) => route.canNavigate === true
    )?.name;

    if (!canNavigate) {
      setIsRedirecting(true);
      router.replace(`${lastCompletedRoute || JOURNEY_PATHS[0]}`);
      console.log("cannot navigate", `${lastCompletedRoute}`);
    } else {
      setIsRedirecting(false);
      dispatch(navigate({ route: path }));
    }
  }, [journeyData, router, path, dispatch]);

  return isRedirecting;
};

export default useRedirectIfInvalidStep;
