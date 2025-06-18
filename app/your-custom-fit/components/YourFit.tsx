"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { fetchHelper } from "@/lib/actions/fetchHelper";
import { useRedirectIfInvalidStep } from "@/lib/hooks/useRedirectIfInvalidStep";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import { useCheckIfUserNameExists } from "@/app/your-custom-fit/hooks/useCheckIfUserNameExists";

import { config } from "@/lib/form-configs/userConfig";
import { API, PATHS } from "@/routes.config";

import {
  getIsRetrieving,
  getUiDataState,
  setUiData,
  setUiDataForRetreive,
} from "@/lib/features/uiData/uiDataSlice";
import { selectState, setStore } from "@/lib/store/store";

import { FitPlan } from "@/types/interfaces/fitness-plan";
import { FormValue, UserFormType } from "@/types/interfaces/form";

import FormProvider from "@/context/FormProvider";
import UserForm from "@/components/form/UserForm";
import Accordion from "@/components/display-plan/Accordion";
import Button from "@/components/Button";
import JourneyButtons from "@/components/journeyNav/JourneyButtons";

import { getUserFitnessPlan } from "@/lib/features/user/userSlice";

import {
  setCanNavigateTrue,
  setNavOnLastPage,
} from "@/lib/features/journey/journeySlice";
import { UiData } from "@/types/enums/uiData.enum";

const YourFit = () => {
  const [userForm, setUserForm] = useState<FormValue>();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const savedState = useAppSelector(selectState);

  const userFitnessPlan = useAppSelector(getUserFitnessPlan);
  const getUiState = useAppSelector(getUiDataState);
  const isRetrieving = useAppSelector(getIsRetrieving);

  const methods = useForm();
  const { reset } = methods;

  const responseError = useCheckIfUserNameExists(userForm);

  useEffect(() => {
    dispatch(setNavOnLastPage());
    dispatch(setUiData({ name: UiData.isEditing, value: false }));
  }, []);

  useEffect(() => {
    if (isRetrieving) {
      console.log(savedState);
      dispatch(setUiDataForRetreive());
      dispatch(setCanNavigateTrue());
      dispatch(setUiData({ name: UiData.isRetrieving, value: false }));
      // dispatch(setStore)
    }
  });

  const inputVal = (val: FormValue) => {
    setUserForm(val);
  };
  const onSubmit = async (userData: UserFormType) => {
    console.log("userData", userData);

    const response = await fetchHelper(API.SAVE_PLAN, {
      savedState,
      userData,
    });

    if (response?.success) {
      reset();

      router.push(
        `${PATHS.SUCCESS}?mode=plan&message=${encodeURIComponent(
          "Your plan has been saved"
        )}`
      );
    }
  };

  return (
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
