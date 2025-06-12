"use client";

import { useEffect } from "react";

import { useFormContext } from "@/context/FormProvider";
import JourneyButtons from "./JourneyButtons";
import setCookiesAndSaveState from "@/lib/actions/setCookiesAndSaveState";
import { useAppSelector } from "@/lib/hooks/storeHooks";
import { selectState } from "@/lib/store/store";
import { usePathname } from "next/navigation";

const JourneyNavigation = ({
  getFormErrors,
}: {
  getFormErrors: (errors: any) => void;
}) => {
  const { handleSubmit, formState } = useFormContext();
  // const savedState = useAppSelector(selectState);
  // const pageName = usePathname();

  useEffect(() => {
    getFormErrors(formState.errors);
  }, [formState]);

  // useEffect(() => {
  //   if (pageName) {
  //     (async () => {
  //       await setCookiesAndSaveState(savedState);
  //     })();

  //     console.log("pageName::", pageName);
  //   }
  // }, [pageName]);

  return <JourneyButtons handleSubmit={handleSubmit}></JourneyButtons>;
};

export default JourneyNavigation;
