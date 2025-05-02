"use client";

import { useForm } from "react-hook-form";

import { API, PATHS } from "@/routes.config";
import { config } from "@/lib/form-configs/userConfig";

import { isNotEmpty } from "@/lib/utils/validation";

import { FitPlan } from "@/types/interfaces/fitness-plan";
import { RootState } from "@/types/interfaces/store";
import { UiData } from "@/types/enums/uiData.enum";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";

import { selectState, setStore } from "@/lib/store/store";
import { getUserFitnessPlan } from "@/lib/features/user/userSlice";
import { setCanNavigateTrue } from "@/lib/features/journey/journeySlice";
import { setUiData } from "@/lib/features/ui-data/uiDataSlice";

import { useLoader } from "@/context/Loader/LoaderProvider";
import FormProvider from "@/context/FormProvider";
import UserForm from "@/components/form/UserForm";
import Accordion from "@/components/your-fit-plan/Accordion";
import Button from "@/components/Button";
import { useMemo, useState } from "react";
import InlineError from "@/components/InlineError";

const RetrieveYourPlan = () => {
  const [responseError, setResponseError] = useState("");

  const dispatch = useAppDispatch();
  const userFitnessPlan = useAppSelector(getUserFitnessPlan);
  const store = useAppSelector(selectState);

  const setRetrievedStore = (retrievedStore: any) => {
    const { _persist, uiData, journey }: RootState = store;
    dispatch(setStore({ ...retrievedStore, uiData, journey, _persist }));
    dispatch(setCanNavigateTrue());
    dispatch(setUiData({ name: UiData.isSignedUp, value: true }));
    dispatch(setUiData({ name: UiData.isRetrieving, value: true }));
  };

  const isUserFitnessPlanNotEmpty = useMemo(
    () => isNotEmpty(userFitnessPlan),
    [userFitnessPlan]
  );

  const { setLoading } = useLoader();

  const methods = useForm();
  const { reset } = methods;

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await fetch(`${API.RETRIEVE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.error) {
        setResponseError(responseData.error);
        console.log("responseData", responseData.error);
        return;
      }
      console.log("responseData", responseData.error);
      setRetrievedStore(responseData);
      reset();
    } catch (error) {
      console.error("Error retrieving data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {isUserFitnessPlanNotEmpty ? (
        <div>
          <h2>Your Custom Fit</h2>
          <Accordion plan={userFitnessPlan as FitPlan}></Accordion>
          <Button style={{ "--margin": "1rem 0" }} href={`${PATHS.ABOUT_YOU}`}>
            Edit your information
          </Button>
        </div>
      ) : (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <UserForm config={config(false)} />
          {responseError && <InlineError error={responseError} />}
          <Button type="submit">Retrieve Your Plan</Button>
        </FormProvider>
      )}
    </div>
  );
};
export default RetrieveYourPlan;
