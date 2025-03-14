"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { RootState } from "@/types/interfaces/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";

import { config } from "@/lib/form-configs/userConfig";

import { getUserFitnessPlan, setUser } from "@/lib/features/user/userSlice";

import InputComponent from "@/components/forms/InputComponent";
import { API } from "@/routes.config";
import { defaultState, setStore } from "@/lib/store/store";
import { isEmpty } from "@/lib/utils/validation";

interface AIResponse {
  finish_reason: string;
  index: number;
  logprobs: any;
  message: { content: string; refusal: string; role: string };
}

const YourFit = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state);
  const userFitnessPlan = useAppSelector(getUserFitnessPlan);
  const { _persist, ...savedState } = state;

  const methods = useForm();
  const { reset } = methods;

  const onSubmit = async () => {
    try {
      const response = await fetch(`${API.SAVE_PLAN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savedState }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        reset();
        dispatch(setStore(defaultState));
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    if (isEmpty(savedState)) return;
    (async () => {
      try {
        const response = await fetch(`${API.GET_PLAN}`, {
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
      } catch (error) {
        console.error("Error saving data:", error);
      }
    })();
  }, []);

  return (
    <div>
      {userFitnessPlan && (
        <div>
          <h1>Your Custom Fit</h1>
          {userFitnessPlan}
        </div>
      )}

      <InputComponent dispatchEvent={setUser} config={config().userName} />
      <InputComponent dispatchEvent={setUser} config={config().password} />
    </div>
  );
};

export default YourFit;
