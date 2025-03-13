"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useFormState } from "react-hook-form";

import { JOURNEY_PATHS, QUESTIONS_PATH } from "@/routes.config";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";

import {
  getJourneyData,
  getRoutes,
  navigate,
} from "@/lib/features/journey/journeySlice";

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
        <Link href="#" onClick={() => handleSubmit}>
          Go To {nextRoute}
        </Link>
      )}
      {prevRoute && (
        <Link href={`${QUESTIONS_PATH}/${prevRoute}`}>Go To {prevRoute}</Link>
      )}
    </nav>
  );
};

export default JourneyNavigation;
