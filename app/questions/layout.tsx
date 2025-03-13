"use client";
import JourneyNavigation from "@/components/JourneyNavigation";
import FormProvider from "@/context/FormProvider";
import { config } from "@/app/questions/preferences/form-configs/config";
import { useFormContext } from "@/context/FormProvider";
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
import { JOURNEY_PATHS, QUESTIONS_PATH } from "@/routes.config";
export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const defaultValues =
  // pathname === "/questions/preferences"
  //   ? { workoutType: config?.workoutType?.checkboxes }
  //   : undefined; //
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathName = usePathname().split("/")[2];
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
        (route) => route.name === pathName && route.canNavigate === true
      )
    );
    const lastCompletedRoute = journeyData.findLast(
      (route) => route.canNavigate === true
    )?.name;

    if (!canNavigate) {
      setIsRedirecting(true);
      router.replace(
        `${QUESTIONS_PATH}/${lastCompletedRoute || JOURNEY_PATHS[0]}`
      );
      console.log("cannot navigate", `${lastCompletedRoute}`);
    } else {
      setIsRedirecting(false);
      dispatch(navigate({ route: pathName }));
      console.log("navigated::::::");
    }
  }, [journeyData, router, pathName, dispatch]);

  const onSubmit = (path: any) => {
    if (isFormValid) {
      dispatch(navigate({ route: pathName, isFormSubmit: true }));
      router.push(`${QUESTIONS_PATH}/${nextRoute}`);
    }
  };

  if (isRedirecting) return null;

  return (
    <FormProvider
      onSubmit={onSubmit}
      defaultValues={{ workoutType: config?.workoutType?.checkboxes }}
    >
      <section>
        {children}

        <JourneyNavigation isValid={formValid} />
      </section>
    </FormProvider>
  );
}
