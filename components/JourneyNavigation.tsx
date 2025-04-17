"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {} from "react-hook-form";

import { PATHS } from "@/routes.config";
import { useAppSelector } from "@/lib/hooks/storeHooks";

import { getRoutes } from "@/lib/features/journey/journeySlice";

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
    <nav>
      {prevRoute && (
        <Button href={prevRoute} disabled={false}>
          Go To {prevRoute.split("/")[2]}
        </Button>
      )}
      {nextRoute && (
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!formState.isValid}
        >
          Go To
          {nextRoute === PATHS.YOUR_FIT ? nextRoute : nextRoute.split("/")[2]}
        </Button>
      )}
    </nav>
  );
};

export default JourneyNavigation;
