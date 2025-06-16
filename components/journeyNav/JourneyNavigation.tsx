"use client";

import { useEffect } from "react";

import { useFormContext } from "@/context/FormProvider";
import JourneyButtons from "./JourneyButtons";

const JourneyNavigation = ({
  getFormErrors,
}: {
  getFormErrors: (errors: any) => void;
}) => {
  const { handleSubmit, formState } = useFormContext();

  useEffect(() => {
    getFormErrors(formState.errors);
  }, [formState]);

  return <JourneyButtons handleSubmit={handleSubmit}></JourneyButtons>;
};

export default JourneyNavigation;
