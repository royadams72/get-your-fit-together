"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "@/lib/hooks/storeHooks";

import { PATHS } from "@/routes.config";

import { setUserInfo } from "@/lib/features/user/userSlice";
import { setCanNavigateTrue } from "@/lib/features/journey/journeySlice";
import { setUiDataForRetreive } from "@/lib/features/uiData/uiDataSlice";

import { UserFormType } from "@/types/interfaces/form";

import { config } from "@/lib/form-configs/userConfig";

import FormProvider from "@/context/FormProvider";
import UserForm from "@/components/form/UserForm";
import Button from "@/components/Button";

const RetrievePlan = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const methods = useForm();
  const { reset } = methods;

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
