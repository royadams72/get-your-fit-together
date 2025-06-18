"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

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

const RetrievePlan = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const methods = useForm();
  const { reset } = methods;

  const onSubmit = async (user: UserFormType) => {
    // userName: "",
    // userPassword: "",
    // console.log("onSubmit:", user);

    dispatch(setUiData({ name: UiData.isRetrieving, value: true }));
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
