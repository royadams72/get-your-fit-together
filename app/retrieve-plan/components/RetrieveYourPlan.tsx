"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import { useClientFetch } from "@/lib/hooks/useClientFetch";

import { API, PATHS } from "@/routes.config";
import { config } from "@/lib/form-configs/userConfig";

import { isNotEmpty } from "@/lib/utils/isEmpty";

import { FitPlan } from "@/types/interfaces/fitness-plan";
import { RootState } from "@/types/interfaces/store";
import { User } from "@/types/enums/user.enum";

import { selectState, setStore } from "@/lib/store/store";
import { getUserFitnessPlan } from "@/lib/features/user/userSlice";
import { setCanNavigateTrue } from "@/lib/features/journey/journeySlice";
import { setUiDataForRetreive } from "@/lib/features/ui-data/uiDataSlice";

import { useLoader } from "@/context/Loader/LoaderProvider";
import FormProvider from "@/context/FormProvider";
import UserForm from "@/components/form/UserForm";
import Accordion from "@/components/display-plan/Accordion";
import Button from "@/components/Button";

const RetrieveYourPlan = () => {
  const [responseError, setResponseError] = useState<{
    message: string;
    messageElement: string;
  }>({ message: "", messageElement: "" });

  const dispatch = useAppDispatch();
  const userFitnessPlan = useAppSelector(getUserFitnessPlan);
  const store = useAppSelector(selectState);
  const clientFetch = useClientFetch();

  const setRetrievedStore = (retrievedStore: any) => {
    const { _persist, uiData, journey }: RootState = store;
    dispatch(setStore({ ...retrievedStore, uiData, journey, _persist }));
    dispatch(setCanNavigateTrue());
    dispatch(setUiDataForRetreive());
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
      const response = await clientFetch(API.RETRIEVE, data);

      if (!response) return;

      if (response.error) {
        setResponseError({
          message: response.error,
          messageElement: User.userPassword,
        });
        return;
      }

      setRetrievedStore(response);
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
          <UserForm customMessage={responseError} config={config(false)} />
          <Button type="submit">Retrieve Your Plan</Button>
        </FormProvider>
      )}
    </div>
  );
};
export default RetrieveYourPlan;
