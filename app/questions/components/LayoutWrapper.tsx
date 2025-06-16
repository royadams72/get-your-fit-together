"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import { config } from "@/app/questions/preferences/form-configs/config";
import { JOURNEY_PATHS, PATHS } from "@/routes.config";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";

import { getRoutes, navigate } from "@/lib/features/journey/journeySlice";
import { selectState } from "@/lib/store/store";

import { useMarkAsEditingUntilYourFit } from "@/lib/hooks/useMarkAsEditingUntilYourFit";
import { useRedirectIfInvalidStep } from "@/lib/hooks/useRedirectIfInvalidStep";

import { isEmpty, isNotEmpty } from "@/lib/utils/isEmpty";
import setCookiesAndSaveState from "@/lib/actions/setCookiesAndSaveState";

import FormProvider from "@/context/FormProvider";
import JourneyNavigation from "@/components/journeyNav/JourneyNavigation";
import cookieAction from "@/lib/actions/cookie.action";
import { CookieAction } from "@/types/enums/cookie.enum";
import { getSessionCookie, setUiData } from "@/lib/features/uiData/uiDataSlice";
import { UiData } from "@/types/enums/uiData.enum";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pageName = usePathname();
  const { nextRoute } = useAppSelector(getRoutes);
  const isCookieInState = useAppSelector(getSessionCookie);
  let formErrors = {};
  const isPreferencesPage = pageName === PATHS.PREFERENCES;
  const isInvalidStep = useRedirectIfInvalidStep();
  useMarkAsEditingUntilYourFit();

  const callNavigate = (dispatchPaths?: string[]) => {
    if (
      isPreferencesPage ||
      (dispatchPaths !== undefined && dispatchPaths.includes(pageName))
    ) {
      dispatch(navigate({ route: pageName, isFormSubmit: true }));
    }
  };

  const getFormErrors = (errorObj: any) => {
    formErrors = errorObj;
    if (isNotEmpty(formErrors)) {
      scrollToError();
    }
  };

  useEffect(() => {
    const dispatchPaths = JOURNEY_PATHS.slice(0, 3);
    callNavigate(dispatchPaths);
    console.log("navigate", dispatchPaths);
  }, [pageName]);

  useEffect(() => {
    (async () => {
      const sessionCookie = await cookieAction(CookieAction.get, [
        "sessionCookie",
      ]);
      if (!isCookieInState && sessionCookie) {
        dispatch(
          setUiData({
            name: UiData.sessionCookie,
            value: sessionCookie as string,
          })
        );
      }
    })();
  }, [isCookieInState]);

  const onSubmit = () => {
    if (isEmpty(formErrors)) {
      callNavigate();
      router.push(nextRoute);
    } else {
      scrollToError();
    }
  };

  const getErrorElement = (error: any): HTMLElement | null => {
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
