"use client";
// import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { config } from "@/app/questions/preferences/form-configs/config";
import { PATHS } from "@/routes.config";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";

import { getRoutes, navigate } from "@/lib/features/journey/journeySlice";

import useMarkAsEditingUntilYourFit from "@/lib/hooks/useMarkAsEditingUntilYourFit";
import useRedirectIfInvalidStep from "@/lib/hooks/useRedirectIfInvalidStep";

import { isEmpty, isNotEmpty } from "@/lib/utils/validation";

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

  // const [formErrors, setFormErrors] = useState({});
  const isRedirecting = useRedirectIfInvalidStep();
  let formErrors = {};
  useMarkAsEditingUntilYourFit();

  const getFormErrors = (errorObj: any) => {
    formErrors = errorObj;
    // console.log("formErrors: ", formErrors);
    if (isNotEmpty(formErrors)) {
      scrollToError();
    }
    // }
  };

  const onSubmit = () => {
    if (isEmpty(formErrors)) {
      dispatch(navigate({ route: pageName, isFormSubmit: true }));
      router.push(nextRoute);
    } else {
      scrollToError();
    }
  };

  const scrollToError = () => {
    const errors: any[] = Object.values(formErrors);
    if (errors.length === 0) return;
    if (errors[0].ref && errors[0].ref) {
      console.log(errors[0].ref);
      errors[0].ref.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
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
        <JourneyNavigation getFormErrors={getFormErrors} />
      </section>
    </FormProvider>
  );
}
