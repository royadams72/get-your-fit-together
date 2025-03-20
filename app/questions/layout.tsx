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

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pageName = usePathname();
  const dispatch = useAppDispatch();

  const { nextRoute } = useAppSelector(getRoutes);
  const journeyData: JourneyData[] = useAppSelector(getJourneyData);

  const [isFormValid, setIsFormValid] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(true);

  const formValid = (bool: boolean) => {
    setIsFormValid(bool);
  };

  useEffect(() => {
    const index = JOURNEY_PATHS.findIndex((path) => path === PATHS.YOUR_FIT);
    const paths = JOURNEY_PATHS.slice(0, index);
    console.log(paths);

    if (paths.includes(pageName)) {
      dispatch(setUiData({ name: UiData.isEditing, value: true }));
      console.log({ value: true });
    }
  }, [pageName, dispatch]);

  useEffect(() => {
    const canNavigate = isNotEmpty(
      journeyData.find(
        (route) => route.name === pageName && route.canNavigate === true
      )
    );
    const lastCompletedRoute = journeyData.findLast(
      (route) => route.canNavigate === true
    )?.name;

    if (!canNavigate) {
      setIsRedirecting(true);
      router.replace(`${lastCompletedRoute || JOURNEY_PATHS[0]}`);
      console.log("cannot navigate", `${lastCompletedRoute}`);
    } else {
      setIsRedirecting(false);
      dispatch(navigate({ route: pageName }));
    }
  }, [journeyData, router, pageName, dispatch]);

  const onSubmit = () => {
    if (isFormValid) {
      dispatch(navigate({ route: pageName, isFormSubmit: true }));
      router.push(nextRoute);
    }
  };
  // Use default values toset checkbox groups and text inputs that get valuse from the DB
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
