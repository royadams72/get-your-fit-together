"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { config } from "@/app/questions/preferences/form-configs/config";
import { PATHS } from "@/routes.config";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";

import { getRoutes, navigate } from "@/lib/features/journey/journeySlice";

import useMarkAsEditingUntilYourFit from "@/lib/hooks/useMarkAsEditingUntilYourFit";
import useRedirectIfInvalidStep from "@/lib/hooks/useRedirectIfInvalidStep";

import FormProvider from "@/context/FormProvider";
import JourneyNavigation from "@/components/JourneyNavigation";

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pageName = usePathname();
  const dispatch = useAppDispatch();
  const { nextRoute } = useAppSelector(getRoutes);

  const [isFormValid, setIsFormValid] = useState(false);
  const isRedirecting = useRedirectIfInvalidStep();
  useMarkAsEditingUntilYourFit();

  const formValid = (bool: boolean) => {
    setIsFormValid(bool);
  };

  const onSubmit = (data: any) => {
    console.log("isFormValid: ", isFormValid, data);

    if (isFormValid) {
      dispatch(navigate({ route: pageName, isFormSubmit: true }));
      router.push(nextRoute);
    }
  };

  // const defaultValues =
  //   pageName === PATHS.PREFERENCES
  //     ? { workoutType: config?.workoutType?.checkboxes }
  //     : {};

  const formKey = `form-${pageName}`;

  if (isRedirecting) return null;

  return (
    <FormProvider
      key={formKey}
      onSubmit={onSubmit}
      // defaultValues={defaultValues}
    >
      <section>
        {children}
        <JourneyNavigation isValid={formValid} />
      </section>
    </FormProvider>
  );
}
