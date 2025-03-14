"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {} from "react-hook-form";

import { QUESTIONS_PATH } from "@/routes.config";
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
          Go To {nextRoute}
        </button>
      )}
      {prevRoute && (
        <Link href={`${QUESTIONS_PATH}/${prevRoute}`}>Go To {prevRoute}</Link>
      )}
    </nav>
  );
};

export default JourneyNavigation;
