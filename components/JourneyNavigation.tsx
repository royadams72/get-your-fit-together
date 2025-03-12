"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useFormState } from "react-hook-form";

import { QUESTIONS_PATH } from "@/routes.config";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";

import { getRoutes, navigate } from "@/lib/features/journey/journeySlice";

import { useFormContext } from "@/context/FormProvider";

const JourneyNavigation = ({
  isValid,
}: {
  isValid: (boolean: boolean) => void;
}) => {
  const dispatch = useAppDispatch();

  const pathName = usePathname().split("/")[2];
  const state = useFormState();
  const { handleSubmit } = useFormContext();
  const { nextRoute, prevRoute } = useAppSelector(getRoutes);

  useEffect(() => {
    isValid(state.isValid);
  }, [state.isValid, isValid]);

  useEffect(() => {
    dispatch(navigate({ route: pathName }));
  }, [pathName, dispatch]);

  // const goBack = () => {
  //   dispatch(navigate(pathName));
  // };

  return (
    <nav>
      {nextRoute && (
        <Link href="#" onClick={() => handleSubmit(pathName)}>
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
