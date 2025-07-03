"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import { useCheckIfUserNameExists } from "@/app/your-custom-fit/hooks/useCheckIfUserNameExists";

import { config } from "@/lib/form-configs/userConfig";
import { PATHS } from "@/routes.config";

import { selectState } from "@/lib/store/store";
import {
  getIsRetrieving,
  getIsSignedIn,
  getUiDataState,
  setUiData,
} from "@/lib/features/uiData/uiDataSlice";
import { getUserFitnessPlan, getUserInfo } from "@/lib/features/user/userSlice";
import { setNavOnLastPage } from "@/lib/features/journey/journeySlice";

import { UiData } from "@/types/enums/uiData.enum";
import { FitPlan } from "@/types/interfaces/fitness-plan";
import { FormValue, UserFormType } from "@/types/interfaces/form";

import FormProvider from "@/context/FormProvider";
import UserForm from "@/components/form/UserForm";
import Accordion from "@/components/display-plan/Accordion";
import Button from "@/components/Button";
import JourneyButtons from "@/components/journeyNav/JourneyButtons";

import { saveToDB } from "@/lib/actions/saveToDB";
import { redirectOnError } from "@/lib/server-functions/redirectOnError";

const YourFit = () => {
  const [userForm, setUserForm] = useState<FormValue>();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const savedState = useAppSelector(selectState);

  const userFitnessPlan = useAppSelector(getUserFitnessPlan);
  const getUiState = useAppSelector(getUiDataState);
  const isRetrieving = useAppSelector(getIsRetrieving);
  const isSignedIn = useAppSelector(getIsSignedIn);
  const userInfoFromState = useAppSelector(getUserInfo);
  console.log();

  const methods = useForm();
  const { reset } = methods;

  const savePlan = async (userData: UserFormType, isForm = true) => {
    const response = await saveToDB(savedState, userData, isForm);

    redirectOnError(response as any);
    if ("success" in response && response.success && isForm) {
      reset();

      router.push(
        `${PATHS.SUCCESS}?mode=plan&message=${encodeURIComponent(
          "Your plan has been saved"
        )}`
      );
    }
  };

  const { responseError } = useCheckIfUserNameExists(userForm);

  useEffect(() => {
    dispatch(setNavOnLastPage());
    dispatch(setUiData({ name: UiData.isEditing, value: false }));
  }, []);

  useEffect(() => {
    if (isRetrieving) {
      dispatch(setUiData({ name: UiData.isRetrieving, value: false }));
    }
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      savePlan(userInfoFromState, false);
    }
  }, []);

  const inputVal = (val: FormValue) => {
    setUserForm(val);
  };
  const onSubmit = async (userData: UserFormType) => {
    savePlan(userData);
  };

  return (
    // TODO: fade in Accordion & better anim for the dropdown
    <div>
      {userFitnessPlan && (
        <Accordion plan={userFitnessPlan as FitPlan}></Accordion>
      )}
      {!getUiState.isSignedIn && (
        <FormProvider aria-label="userForm" onSubmit={onSubmit}>
          <UserForm
            title={"Create a username and password to save your plan:"}
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
