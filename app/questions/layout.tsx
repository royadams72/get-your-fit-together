"use client";
import JourneyNavigation from "@/components/JourneyNavigation";
import FormProvider from "@/context/FormProvider";
import { config } from "@/app/questions/preferences/form-configs/config";
import { JourneyData } from "@/types/interfaces/journey";
import { isNotEmpty } from "@/lib/utils/validation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import {
  getJourneyData,
  getRoutes,
  navigate,
} from "@/lib/features/journey/journeySlice";
import { usePathname, useRouter } from "next/navigation";
import { PATHS, JOURNEY_PATHS } from "@/routes.config";
import { UiData } from "@/types/enums/uiData.enum";
import { setUiData } from "@/lib/features/ui-data/uiDataSlice";

import useMarkAsEditingUntilYourFit from "@/lib/hooks/useMarkAsEditingUntilYourFit";
import useRedirectIfInvalidStep from "@/lib/hooks/useRedirectIfInvalidStep";

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

  const onSubmit = () => {
    if (isFormValid) {
      dispatch(navigate({ route: pageName, isFormSubmit: true }));
      router.push(nextRoute);
    }
  };

  const defaultValues =
    pageName === PATHS.PREFERENCES
      ? { workoutType: config?.workoutType?.checkboxes }
      : {};

  const formKey = `form-${pageName}`;

  if (isRedirecting) return null;

  return (
    <FormProvider
      key={formKey}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    >
      <section>
        {children}
        <JourneyNavigation isValid={formValid} />
      </section>
    </FormProvider>
  );
}
