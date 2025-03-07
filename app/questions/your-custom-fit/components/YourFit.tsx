"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { RootState } from "@/lib/store/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";

import { config } from "@/lib/form-configs/userConfig";

import { getUserState, setUser } from "@/lib/features/user/userSlice";
import FormProvider from "@/context/FormProvider";
import InputComponent from "@/components/forms/InputComponent";
import { isNotEmpty } from "@/lib/utils/validation";

interface AIResponse {
  finish_reason: string;
  index: number;
  logprobs: any;
  message: { content: string; refusal: string; role: string };
}

const YourFit = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserState);
  const state = useAppSelector((state: RootState) => state);
  const { _persist, ...savedState } = state;

  const [yourFitPlan, setYourFitPlan] = useState<any>(null);

  const methods = useForm();
  const { reset } = methods;

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/save-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savedState }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        reset();
        setYourFitPlan(null);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3000/api/get-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savedState),
        });
        const responseData: AIResponse = await response.json();
        const { content: fitnessPlan } = responseData.message;
        dispatch(
          setUser({
            name: "userFitnessPlan",
            value: fitnessPlan,
          })
        );
        setYourFitPlan(fitnessPlan);
      } catch (error) {
        console.error("Error saving data:", error);
      }
    })();
  }, []);

  return (
    <div>
      {yourFitPlan && (
        <div>
          <h1>Your Custom Fit</h1>
          {yourFitPlan}
        </div>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <InputComponent
          defaultValue={user?.userName}
          dispatchEvent={setUser}
          config={config().userName}
        />
        <InputComponent dispatchEvent={setUser} config={config().password} />
        <button type="submit">Submit</button>
      </FormProvider>
    </div>
  );
};

export default YourFit;
