import { useAppSelector } from "@/lib/hooks/storeHooks";
import { getRoutes } from "@/lib/features/journey/journeySlice";

import styles from "@/styles/components/_journeyNav.module.scss";

import Button from "@/components/Button";

export const JourneyButtons = ({
  handleSubmit,
}: {
  handleSubmit?: () => void;
}) => {
  const { nextRoute, prevRoute } = useAppSelector(getRoutes);

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
          Next
        </Button>
      )}
    </nav>
  );
};

export default JourneyButtons;
