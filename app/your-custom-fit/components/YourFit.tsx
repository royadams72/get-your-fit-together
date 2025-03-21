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
import { useLoader } from "@/context/Loader/LoaderProvider";
import { getUiDataState, setUiData } from "@/lib/features/ui-data/uiDataSlice";
import { UiData } from "@/types/enums/uiData.enum";
import UserForm from "@/components/forms/UserForm";
import { FormValue } from "@/types/interfaces/form";

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
  const getUiState = useAppSelector(getUiDataState);

  const methods = useForm();
  const { reset } = methods;
  const { setLoading } = useLoader();

  const [checkUserMessage, setCheckUserMessage] = useState("");
  const [formUserName, setFormUserName] = useState<FormValue>();

  const inputVal = (val: FormValue) => {
    setFormUserName(val);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!formUserName || formUserName.value.length < 6) return;
    console.log(formUserName);

    (async () => {
      try {
        const response = await fetch(`${API.CHECK_USER}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formUserName.value),
        });

        const responseData = await response.json();
        if (responseData.error) {
          setCheckUserMessage(responseData.error);
        } else {
          setCheckUserMessage("");
        }
      } catch (error) {
        console.error("Error getting data:", error);
      }
    })();
  }, [formUserName, getUiState.isEditing]);

  useEffect(() => {
    if (!getUiState.isEditing) return;
    (async () => {
      setLoading(true);
      try {
        console.log("fetching data::");

        const response = await fetch(`${API.GET_PLAN}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savedState),
        });
        const responseData: AIResponse = await response.json();

        if (!responseData || !responseData.message) {
          console.error("Invalid API response:", responseData);
          return;
        }
        const { content: fitnessPlan } = responseData.message;
        console.log("responseData:: loaded");
        dispatch(
          setUser({
            name: "userFitnessPlan",
            value: fitnessPlan,
          })
        );
        dispatch(setUiData({ name: UiData.isEditing, value: false }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
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
      <FormProvider defaultValues={{ userName: userName }} onSubmit={onSubmit}>
        <UserForm
          config={config}
          customMessage={checkUserMessage}
          inputValue={inputVal}
          isYourFitPage={true}
        ></UserForm>
        <button type="submit">Submit</button>
      </FormProvider>
    </div>
  );
};

export default YourFit;
