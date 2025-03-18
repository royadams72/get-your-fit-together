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
import { JOURNEY, JOURNEY_PATHS } from "@/routes.config";

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const routeName = usePathname();
  const { nextRoute } = useAppSelector(getRoutes);

  const [isFormValid, setIsFormValid] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(true);

  const journeyData: JourneyData[] = useAppSelector(getJourneyData);

  const formValid = (bool: boolean) => {
    setIsFormValid(bool);
  };

  useEffect(() => {
    const canNavigate = isNotEmpty(
      journeyData.find(
        (route) => route.name === routeName && route.canNavigate === true
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
      dispatch(navigate({ route: routeName }));
    }
  }, [journeyData, router, routeName, dispatch]);

  const onSubmit = () => {
    if (isFormValid) {
      dispatch(navigate({ route: routeName, isFormSubmit: true }));
      router.push(nextRoute);
    }
  };
  // Use default values toset checkbox groups and text inputs that get valuse from the DB
  const defaultValues =
    routeName === JOURNEY.PREFERENCES
      ? { workoutType: config?.workoutType?.checkboxes }
      : {};

  const formKey = `form-${routeName}`;

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
