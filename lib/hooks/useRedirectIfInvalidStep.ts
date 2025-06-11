import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { JOURNEY_PATHS } from "@/routes.config";
import { JourneyData } from "@/types/interfaces/journey";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";

import { isNotEmpty } from "@/lib/utils/isEmpty";
import { getJourneyData, navigate } from "@/lib/features/journey/journeySlice";

export const useRedirectIfInvalidStep = () => {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useAppDispatch();

  const journeyData: JourneyData[] = useAppSelector(getJourneyData);
  const [isInvalidStep, setIsInvalidStep] = useState(true);
  console.log("useRedirectIfInvalidStep::", journeyData);

  useEffect(() => {
    const canNavigate = isNotEmpty(
      journeyData.find(
        (route) => route.name === path && route.canNavigate === true
      )
    );

    const lastCompletedRoute = journeyData?.findLast(
      (route) => route.canNavigate === true
    )?.name;

    if (!canNavigate) {
      setIsInvalidStep(true);
      router?.replace(`${lastCompletedRoute || JOURNEY_PATHS[0]}`);
    } else {
      setIsInvalidStep(false);
      dispatch(navigate({ route: path }));
    }
  }, [router, path]);

  return isInvalidStep;
};
