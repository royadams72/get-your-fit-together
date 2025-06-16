import { useAppSelector } from "@/lib/hooks/storeHooks";
import { getRoutes } from "@/lib/features/journey/journeySlice";

import styles from "@/styles/components/_journeyNav.module.scss";

import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { JOURNEY_PATHS } from "@/routes.config";

export const JourneyButtons = ({
  handleSubmit,
}: {
  handleSubmit?: () => void;
}) => {
  const { nextRoute, prevRoute } = useAppSelector(getRoutes);
  const [nextBtn, setNextBtn] = useState("Next");
  useEffect(() => {
    const routeBeforeLastPage = JOURNEY_PATHS[JOURNEY_PATHS.length - 1];
    if (nextRoute === routeBeforeLastPage) {
      setNextBtn("Get Plan");
    } else {
      setNextBtn("Next");
    }
  }, [nextRoute]);
  return (
    <nav
      className={`${styles.journeyNav}  ${
        !prevRoute && styles.journeyNavSingle
      }`}
    >
      {prevRoute && (
        <Button href={prevRoute} aux={true}>
          Back
        </Button>
      )}
      {nextRoute && (
        <Button type="button" onClick={handleSubmit}>
          {nextBtn}
        </Button>
      )}
    </nav>
  );
};

export default JourneyButtons;
