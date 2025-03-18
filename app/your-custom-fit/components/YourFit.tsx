"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { RootState } from "@/types/interfaces/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";

import { config } from "@/lib/form-configs/userConfig";

import {
  getUserFitnessPlan,
  getUserName,
  setUser,
} from "@/lib/features/user/userSlice";

import InputComponent from "@/components/forms/InputComponent";
import { API } from "@/routes.config";

import FormProvider from "@/context/FormProvider";
import { isEmpty } from "@/lib/utils/validation";
import { setStore, defaultState, selectState } from "@/lib/store/store";

interface AIResponse {
  finish_reason: string;
  index: number;
  logprobs: any;
  message: { content: string; refusal: string; role: string };
}

const YourFit = () => {
  const dispatch = useAppDispatch();
  const savedState = useAppSelector(selectState);
  const userFitnessPlan = useAppSelector(getUserFitnessPlan);
  const userName = useAppSelector(getUserName) || "";

  const [checkUserMessage, setCheckUserMessage] = useState("");

  const methods = useForm();
  const { reset } = methods;
  console.log("userName in Redux:", userName);
  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      const response = await fetch(`${API.SAVE_PLAN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savedState }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        console.log(responseData);

        reset();
        dispatch(setStore(defaultState));
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    if (userName.length < 6) return;
    console.log("userName.length::", userName.length, userName);

    (async () => {
      try {
        const response = await fetch(`${API.CHECK_USER}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userName),
        });

        const responseData = await response.json();
        console.log(responseData);
        if (responseData.error) {
          setCheckUserMessage(responseData.error);
        } else {
          setCheckUserMessage("");
        }
      } catch (error) {
        console.error("Error getting data:", error);
      }
    })();
  }, [userName]);

  // useEffect(() => {
  //   if (isEmpty(savedState)) return;
  //   (async () => {
  //     try {
  //       const response = await fetch(`${API.GET_PLAN}`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(savedState),
  //       });
  //       const responseData: AIResponse = await response.json();
  //       const { content: fitnessPlan } = responseData.message;
  //       dispatch(
  //         setUser({
  //           name: "userFitnessPlan",
  //           value: fitnessPlan,
  //         })
  //       );
  //     } catch (error) {
  //       console.error("Error saving data:", error);
  //     }
  //   })();
  // }, []);

  return (
    <div>
      {userFitnessPlan && (
        <div>
          <h1>Your Custom Fit</h1>
          {userFitnessPlan}
        </div>
      )}
      <FormProvider defaultValues={{ userName: userName }} onSubmit={onSubmit}>
        <InputComponent
          customMessage={checkUserMessage}
          dispatchEvent={setUser}
          config={config.userName}
        />
        {}
        <InputComponent dispatchEvent={setUser} config={config.password} />
        <button type="submit">Submit</button>
      </FormProvider>
    </div>
  );
};

export default YourFit;
