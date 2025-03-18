"use client";
import { useForm } from "react-hook-form";

import { config } from "@/lib/form-configs/userConfig";
import InputComponent from "@/components/forms/InputComponent";
import FormProvider from "@/context/FormProvider";
import { API, JOURNEY } from "@/routes.config";
import { getUserFitnessPlan } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import { setStore } from "@/lib/store/store";
import Link from "next/link";

const RetrieveYourPlan = () => {
  const dispatch = useAppDispatch();
  const userFitnessPlan = useAppSelector(getUserFitnessPlan);
  const methods = useForm();
  const { reset } = methods;

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      const response = await fetch(`${API.RETRIEVE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      dispatch(setStore(responseData));
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
