"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";

import { PATHS } from "@/routes.config";

import { setUserInfo } from "@/lib/features/user/userSlice";
import { setCanNavigateTrue } from "@/lib/features/journey/journeySlice";
import {
  getSessionCookie,
  setUiData,
  setUiDataForRetreive,
} from "@/lib/features/uiData/uiDataSlice";

import { UiData } from "@/types/enums/uiData.enum";
import { UserFormType } from "@/types/interfaces/form";

import cookieAction from "@/lib/actions/cookie.action";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";

import { config } from "@/lib/form-configs/userConfig";

import FormProvider from "@/context/FormProvider";
import UserForm from "@/components/form/UserForm";
import Button from "@/components/Button";

const RetrievePlan = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isSessionInState = useAppSelector(getSessionCookie);
  const methods = useForm();
  const { reset } = methods;

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const sessionCookie = await cookieAction(CookieAction.get, [
          Cookie.sessionCookie,
        ]);
        console.log("sessionCookie in retrieve", sessionCookie);

        if (!isSessionInState) {
          dispatch(
            setUiData({
              name: UiData.sessionCookie,
              value: sessionCookie as string,
            })
          );
        }
      })();
    }, 100);
  }, []);

  const onSubmit = async (user: UserFormType) => {
    dispatch(setUiDataForRetreive());
    dispatch(setCanNavigateTrue());
    dispatch(setUserInfo(user));
    router.push(PATHS.YOUR_FIT);

    reset();
    return;
  };

  return (
    <div>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <UserForm
          title={"Enter your user name and password to retrieve your plan:"}
          config={config(false)}
        />
        <Button type="submit">Retrieve Your Plan</Button>
      </FormProvider>
    </div>
  );
};
export default RetrievePlan;
