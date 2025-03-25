"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { config } from "@/lib/form-configs/userConfig";
import { API, PATHS } from "@/routes.config";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import { getUserFitnessPlan, setUser } from "@/lib/features/user/userSlice";
import { getUiDataState, setUiData } from "@/lib/features/ui-data/uiDataSlice";
import { setStore, defaultState, selectState } from "@/lib/store/store";

import { FormValue } from "@/types/interfaces/form";
import { UserStore } from "@/types/interfaces/user";
import { User } from "@/types/enums/user.enum";
import { UiData } from "@/types/enums/uiData.enum";

import { useLoader } from "@/context/Loader/LoaderProvider";
import FormProvider from "@/context/FormProvider";
import UserForm from "@/components/forms/UserForm";

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
  const getUiState = useAppSelector(getUiDataState);

  const methods = useForm();
  const { reset } = methods;
  const { setLoading } = useLoader();

  const [checkUserMessage, setCheckUserMessage] = useState("");
  const [userForm, setUserForm] = useState<FormValue>();

  const inputVal = (val: FormValue) => {
    setUserForm(val);
  };

  const onSubmit = async (form: any) => {
    try {
      setLoading(true);
      const response = await fetch(`${API.SAVE_PLAN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savedState }),
      });
      const responseData = await response.json();

      if (responseData.success) {
        for (const [key, val] of Object.entries(form)) {
          dispatch(
            setUser({ name: key as keyof UserStore, value: val as string })
          );
        }
        reset();
        dispatch(setStore(defaultState));
        dispatch(setUiData({ name: UiData.isSignedUp, value: true }));
      }
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      !userForm ||
      userForm.name !== User.userName ||
      userForm.value.length < 6
    )
      return;

    (async () => {
      try {
        const response = await fetch(`${API.CHECK_USER}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userForm.value),
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
  }, [userForm, getUiState.isEditing]);

  useEffect(() => {
    if (!getUiState.isEditing) return;
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API.GET_PLAN}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savedState),
        });
        const responseData: AIResponse = await response.json();

        if (!responseData) {
          console.error("Invalid API response:", responseData);
          return;
        }
        // const { content: fitnessPlan } = responseData.message;
        dispatch(
          setUser({
            name: User.userFitnessPlan,
            value: responseData,
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
      {/* {userFitnessPlan && (
        <div>
          <h1>Your Custom Fit</h1>
          {userFitnessPlan}
        </div>
      )} */}
      {!getUiState.isSignedUp && (
        <section>
          <h1> Create a username and password to save your plan:</h1>
          <FormProvider onSubmit={onSubmit}>
            <UserForm
              config={config}
              customMessage={checkUserMessage}
              inputValue={inputVal}
              isYourFitPage={true}
            ></UserForm>
            <button type="submit">Save your plan</button>
          </FormProvider>
        </section>
      )}
      {getUiState.isSignedUp && !userFitnessPlan && (
        <div>
          <h1>Your plan has been saved</h1>
          <Link href={PATHS.RETRIEVE_PLAN}>
            You can retrieve your plan here
          </Link>
        </div>
      )}
    </div>
  );
};

export default YourFit;
