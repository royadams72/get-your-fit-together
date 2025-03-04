"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { RootState } from "@/lib/store/store";
import { useAppSelector } from "@/lib/hooks/storeHooks";

import { config } from "@/app/questions/your-custom-fit/form-configs/config";

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
  const state = useAppSelector((state: RootState) => state);
  const [yourFitPlan, setYourFitPlan] = useState<any>(null);
  const { _persist, ...savedState } = state;
  const methods = useForm();
  const { reset } = methods;
  const user = useAppSelector(getUserState);
  useEffect(() => {
    if (isNotEmpty(user)) {
      console.log(user);
    }
  }, []);
  const onSubmit = async (data: any) => {
    console.log("Form Submitted:", savedState);

    try {
      const response = await fetch("/api/save-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savedState }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        console.log("Data saved successfully!");
        reset();
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       console.log("savedState:", savedState);
  //       const response = await fetch("http://localhost:3000/api/get-plan", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(savedState),
  //       });
  //       const responseData: AIResponse = await response.json();
  //       console.log("responseData:", responseData);

  //       setYourFitPlan(responseData.message.content);
  //     } catch (error) {
  //       console.error("Error saving data:", error);
  //     }
  //   })();
  // }, []);

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
          defaultValue={user.userPassword}
          dispatchEvent={setUser}
          config={config.password}
        />
        <button type="submit">Submit</button>
      </FormProvider>
    </div>
  );
};

export default YourFit;
