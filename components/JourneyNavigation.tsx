"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {} from "react-hook-form";

import { JOURNEY, QUESTIONS_PATH } from "@/routes.config";
import { useAppSelector } from "@/lib/hooks/storeHooks";

import { getRoutes } from "@/lib/features/journey/journeySlice";

import { useFormContext } from "@/context/FormProvider";

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
      {nextRoute && (
        <button type="button" onClick={handleSubmit}>
          Go To{" "}
          {nextRoute === JOURNEY.YOUR_FIT ? nextRoute : nextRoute.split("/")[2]}
        </button>
      )}
      {prevRoute && (
        <Link href={prevRoute}>Go To {prevRoute.split("/")[2]}</Link>
      )}
    </nav>
  );
};

export default JourneyNavigation;
