"use client";

import React, { useEffect } from "react";

import { PATHS } from "@/routes.config";
import { useAppSelector } from "@/lib/hooks/storeHooks";

import { getRoutes } from "@/lib/features/journey/journeySlice";

import styles from "@/styles/components/_journeyNav.module.scss";

import { useFormContext } from "@/context/FormProvider";
import Button from "@/components/Button";

const JourneyNavigation = ({
  isValid,
}: {
  isValid: (boolean: boolean) => void;
}) => {
  const { handleSubmit, formState } = useFormContext();

  const { nextRoute, prevRoute } = useAppSelector(getRoutes);

  useEffect(() => {
    isValid(formState.isValid);
  }, [formState.isValid, isValid]);

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

export default JourneyNavigation;
