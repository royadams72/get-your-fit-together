"use client";
import JourneyNavigation from "@/components/JourneyNavigation";
import FormProvider from "@/context/FormProvider";
import { config } from "@/app/questions/preferences/form-configs/config";
import { useFormContext } from "@/context/FormProvider";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import { getRoutes, navigate } from "@/lib/features/journey/journeySlice";
import { useRouter } from "next/navigation";
import { QUESTIONS_PATH } from "@/routes.config";
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
  const { nextRoute } = useAppSelector(getRoutes);

  const [isFormValid, setIsFormValid] = useState(false);

  const formValid = (bool: boolean) => {
    setIsFormValid(bool);
  };
  const onSubmit = (path: any) => {
    if (isFormValid) {
      dispatch(navigate({ route: path, isFormSubmit: true }));
      router.push(`${QUESTIONS_PATH}/${nextRoute}`);
    }
  };
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
