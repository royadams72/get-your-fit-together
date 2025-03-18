"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { API, JOURNEY } from "@/routes.config";
import { config } from "@/lib/form-configs/userConfig";

import { selectState, setStore } from "@/lib/store/store";
import { getUserFitnessPlan } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";

import FormProvider from "@/context/FormProvider";
import InputComponent from "@/components/forms/InputComponent";
import { RootState } from "@/types/interfaces/store";
import { useEffect, useRef } from "react";
import { shallowEqual } from "react-redux";
import { setCanNavigateTrue } from "@/lib/features/journey/journeySlice";

const RetrieveYourPlan = () => {
  const dispatch = useAppDispatch();
  const userFitnessPlan = useAppSelector(getUserFitnessPlan);
  // const state = useAppSelector((state: RootState) => state, shallowEqual);
  const store = useAppSelector(selectState);
  // const stateRef = useRef(state);
  // console.log(store);
  const setRetrievedStore = (retrievedStore: any) => {
    const { _persist, uiData, journey }: RootState = store;
    dispatch(setStore({ ...retrievedStore, uiData, journey, _persist }));
    dispatch(setCanNavigateTrue());
  };
  const methods = useForm();
  const { reset } = methods;

  // useEffect(() => {
  //   stateRef.current = state; // Update ref when state changes
  // }, [state]);
  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(`${API.RETRIEVE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      setRetrievedStore(responseData);
      reset();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <div>
      {userFitnessPlan ? (
        <div>
          <h1>Your Custom Fit</h1>
          {userFitnessPlan}
          <Link href={`${JOURNEY.ABOUT_YOU}`}>Edit your information here</Link>
        </div>
      ) : (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <InputComponent config={config.userName} />
          <InputComponent config={config.password} />
          <button type="submit">Submit</button>
        </FormProvider>
      )}
    </div>
  );
};
export default RetrieveYourPlan;
