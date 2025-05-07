"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useRedirectIfInvalidStep from "@/lib/hooks/useRedirectIfInvalidStep";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";

import { config } from "@/lib/form-configs/userConfig";
import { API, PATHS } from "@/routes.config";

import { isNotEmpty } from "@/lib/utils/isEmpty";

import { getUserFitnessPlan, setUser } from "@/lib/features/user/userSlice";
import { getUiDataState } from "@/lib/features/ui-data/uiDataSlice";
import { setStore, defaultState, selectState } from "@/lib/store/store";

import { FitPlan } from "@/types/interfaces/fitness-plan";
import { FormValue } from "@/types/interfaces/form";
import { UserStore } from "@/types/interfaces/user";

import { useLoader } from "@/context/Loader/LoaderProvider";
import FormProvider from "@/context/FormProvider";
import UserForm from "@/components/form/UserForm";
import Accordion from "@/components/your-fit-plan/Accordion";
import Button from "@/components/Button";
import { useGetYourPlanOnLoad } from "../hooks/useGetYourPlanOnLoad";
import { useCheckIfUserNameExists } from "../hooks/useCheckIfUserNameExists";

const YourFit = () => {
  const dispatch = useAppDispatch();
  const savedState = useAppSelector(selectState);
  const userFitnessPlan = useAppSelector(getUserFitnessPlan);
  const getUiState = useAppSelector(getUiDataState);

  const methods = useForm();
  const { reset } = methods;
  const { setLoading } = useLoader();

  const [userForm, setUserForm] = useState<FormValue>();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const isInvalidStep = useRedirectIfInvalidStep();

  const inputVal = (val: FormValue) => {
    setUserForm(val);
  };

  useGetYourPlanOnLoad(isNotEmpty(userFitnessPlan));
  const responseError = useCheckIfUserNameExists(userForm, getUiState);

  const onSubmit = async (form: any) => {
    for (const [key, val] of Object.entries(form)) {
      dispatch(setUser({ name: key as keyof UserStore, value: val as string }));
    }

    try {
      setLoading(true);

      const response = await fetch(`${API.SAVE_PLAN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savedState }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        reset();
        dispatch(setStore(defaultState));
        setSavedSuccess(true);
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
        <section>
          <h3> Create a username and password to save your plan:</h3>
          <FormProvider onSubmit={onSubmit}>
            <UserForm
              config={config(true)}
              customMessage={responseError}
              inputValue={inputVal}
            ></UserForm>
            <Button type="submit">Save your plan</Button>
          </FormProvider>
        </section>
      )}
      {savedSuccess && (
        <div>
          <h3 style={{ color: "var(--success)" }}>Your plan has been saved</h3>
          <Button href={PATHS.RETRIEVE_PLAN} style={{ marginTop: "1rem" }}>
            You can retrieve your plan here
          </Button>
        </div>
      )}
    </div>
  );
};

export default YourFit;
