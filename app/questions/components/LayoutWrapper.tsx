"use client";
import { usePathname, useRouter } from "next/navigation";

import { config } from "@/app/questions/preferences/form-configs/config";
import { PATHS } from "@/routes.config";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import useSetSessionToStore from "@/lib/hooks/useSetSessionToStore";

import { getRoutes, navigate } from "@/lib/features/journey/journeySlice";

import { isEmpty, isNotEmpty } from "@/lib/utils/isEmpty";

import { useMarkAsEditingUntilYourFit } from "@/lib/hooks/useMarkAsEditingUntilYourFit";
import { useRedirectIfInvalidStep } from "@/lib/hooks/useRedirectIfInvalidStep";

import FormProvider from "@/context/FormProvider";
import JourneyNavigation from "@/components/journeyNav/JourneyNavigation";
import createOrRefreshSession from "@/lib/actions/createOrRefreshSession";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pageName = usePathname();
  const { nextRoute } = useAppSelector(getRoutes);

  let formErrors = {};
  const isPreferencesPage = pageName === PATHS.PREFERENCES;

  useSetSessionToStore();
  const isInvalidStep = useRedirectIfInvalidStep();
  useMarkAsEditingUntilYourFit();

  const getFormErrors = (errorObj: any) => {
    formErrors = errorObj;
    if (isNotEmpty(formErrors)) {
      scrollToError();
    }
  };

  const onSubmit = async () => {
    if (isEmpty(formErrors)) {
      dispatch(navigate({ route: pageName, isFormSubmit: true }));

      if (isPreferencesPage) {
        await createOrRefreshSession();
      }

      router.push(nextRoute);
    } else {
      scrollToError();
    }
  };

  const getErrorElement = (error: any): HTMLElement | null => {
    // TODO: handle error type
    if (error == null) return null;

    if (error?.ref?.type === "radio")
      return document.querySelector(`label[for="${error.ref.value}"]`);

    if (error.ref) return error.ref;

    if (error.root?.ref?.name)
      return document.getElementById(`${error.root.ref.name}`);

    return null;
  };

  const scrollToError = () => {
    const errors: any[] = Object.values(formErrors);
    if (errors.length === 0) return;

    const element = getErrorElement(errors[0]);

    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    element?.focus();
  };
  const defaultValues = isPreferencesPage
    ? { workoutType: config?.workoutType?.checkboxes }
    : {};

  const formKey = `form-${pageName}`;

  if (isInvalidStep) return null;

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
