"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "@/lib/hooks/useRouter";
import { useRedirectIfInvalidStep } from "@/lib/hooks/useRedirectIfInvalidStep";
import { useAppSelector } from "@/lib/hooks/storeHooks";
import { useGetYourPlanOnLoad } from "@/app/your-custom-fit/hooks/useGetYourPlanOnLoad";
import { useCheckIfUserNameExists } from "@/app/your-custom-fit/hooks/useCheckIfUserNameExists";

import { config } from "@/lib/form-configs/userConfig";
import { API, PATHS } from "@/routes.config";

import { getUserFitnessPlan } from "@/lib/features/user/userSlice";
import { getUiDataState } from "@/lib/features/ui-data/uiDataSlice";
import { selectState } from "@/lib/store/store";

import { FitPlan } from "@/types/interfaces/fitness-plan";
import { FormValue } from "@/types/interfaces/form";

import { useLoader } from "@/context/Loader/LoaderProvider";
import FormProvider from "@/context/FormProvider";
import UserForm from "@/components/form/UserForm";
import Accordion from "@/components/display-plan/Accordion";
import Button from "@/components/Button";
import JourneyButtons from "@/components/journeyNav/JourneyButtons";

export const savePlan = async (savedState: any, userData?: any) => {
  const response = await fetch(`${API.SAVE_PLAN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(savedState, userData),
  });
  return response;
};

const YourFit = () => {
  const router = useRouter();

  const savedState = useAppSelector(selectState);
  const userFitnessPlan = useAppSelector(getUserFitnessPlan);
  const getUiState = useAppSelector(getUiDataState);

  const methods = useForm();
  const { reset } = methods;
  const { setLoading } = useLoader();

  const [userForm, setUserForm] = useState<FormValue>();
  const isInvalidStep = useRedirectIfInvalidStep();

  const inputVal = (val: FormValue) => {
    setUserForm(val);
  };

  useGetYourPlanOnLoad();
  const responseError = useCheckIfUserNameExists(userForm);

  const onSubmit = async (form: any) => {
    console.log("form", form);

    try {
      setLoading(true);
      const response = await savePlan({ savedState, userData: form });
      const responseData = await response.json();

      if (responseData.success) {
        reset();

        router.push({
          pathname: PATHS.SUCCESS,
          query: { mode: "plan", message: "Your plan has been saved" },
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isInvalidStep) return null;

  return (
    <div>
      {userFitnessPlan && (
        <Accordion plan={userFitnessPlan as FitPlan}></Accordion>
      )}
      {!getUiState.isSignedIn && (
        <FormProvider onSubmit={onSubmit}>
          <UserForm
            config={config(true)}
            customMessage={responseError}
            inputValue={inputVal}
          ></UserForm>
          <Button style={{ marginBottom: "5rem" }} type="submit">
            Save your plan
          </Button>
        </FormProvider>
      )}

      <JourneyButtons />
    </div>
  );
};

export default YourFit;
