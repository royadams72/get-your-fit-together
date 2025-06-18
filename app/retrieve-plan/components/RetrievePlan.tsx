"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import { useClientFetch } from "@/lib/hooks/useClientFetch";

import { API, PATHS } from "@/routes.config";
import { config } from "@/lib/form-configs/userConfig";

import { isNotEmpty } from "@/lib/utils/isEmpty";

import { FitPlan } from "@/types/interfaces/fitness-plan";
import { RootState } from "@/types/interfaces/store";
import { User } from "@/types/enums/user.enum";

import { selectState, setStore } from "@/lib/store/store";
import {
  getUserFitnessPlan,
  setUser,
  setUserInfo,
} from "@/lib/features/user/userSlice";
import { setCanNavigateTrue } from "@/lib/features/journey/journeySlice";
import {
  setUiData,
  setUiDataForRetreive,
} from "@/lib/features/uiData/uiDataSlice";

import FormProvider from "@/context/FormProvider";
import UserForm from "@/components/form/UserForm";

import Button from "@/components/Button";

import { useRouter } from "next/navigation";
import StoreProvider from "@/app/StoreProvider";
import { UiData } from "@/types/enums/uiData.enum";
import { UserFormType } from "@/types/interfaces/form";
import cookieAction from "@/lib/actions/cookie.action";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
import { useSessionCookie } from "@/lib/hooks/useSessionCookie";

const RetrievePlan = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [cookie, setCookie] = useState("");
  // const sessionCookie = useSessionCookie();
  const methods = useForm();
  const { reset } = methods;
  useEffect(() => {
    (async () => {
      let sessionCookie = await cookieAction(CookieAction.get, [
        Cookie.sessionCookie,
      ]);
      console.log("retreive sessionCookie:", sessionCookie);

      if (!sessionCookie) {
        sessionCookie = uuidv4();
        await cookieAction(
          CookieAction.set,
          [Cookie.sessionCookie],
          [sessionCookie]
        );
        dispatch(
          setUiData({ name: UiData.sessionCookie, value: sessionCookie })
        );
        setCookie(sessionCookie);
      }
    })();
  }, []);

  // useEffect(() => {
  //   if (sessionCookie) {
  //     console.log("Session cookie ready:", sessionCookie);
  //     // dispatch(setUiData({ name: UiData.sessionCookie, value: sessionCookie }));
  //   }
  // }, [sessionCookie]);

  const onSubmit = async (user: UserFormType) => {
    // userName: "",
    // userPassword: "",
    // console.log("onSubmit:", user);

    dispatch(setUiData({ name: UiData.isRetrieving, value: true }));
    // dispatch(setUiData({ name: UiData.sessionCookie, value: cookie }));
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
