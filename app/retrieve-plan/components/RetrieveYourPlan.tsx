"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { API, JOURNEY } from "@/routes.config";
import { config } from "@/lib/form-configs/userConfig";

import { RootState } from "@/types/interfaces/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import { getUserFitnessPlan } from "@/lib/features/user/userSlice";
import { setCanNavigateTrue } from "@/lib/features/journey/journeySlice";
import { selectState, setStore } from "@/lib/store/store";

import FormProvider from "@/context/FormProvider";
import InputComponent from "@/components/forms/InputComponent";
import { setUiData } from "@/lib/features/ui-data/uiDataSlice";
import { UiData } from "@/types/enums/uiData.enum";

const RetrieveYourPlan = () => {
  const dispatch = useAppDispatch();
  const userFitnessPlan = useAppSelector(getUserFitnessPlan);

  const store = useAppSelector(selectState);

  const setRetrievedStore = (retrievedStore: any) => {
    const { _persist, uiData, journey }: RootState = store;
    dispatch(setStore({ ...retrievedStore, uiData, journey, _persist }));
    dispatch(setCanNavigateTrue());
    dispatch(setUiData({ name: UiData.isEditing, value: true }));
  };
  const methods = useForm();
  const { reset } = methods;

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
