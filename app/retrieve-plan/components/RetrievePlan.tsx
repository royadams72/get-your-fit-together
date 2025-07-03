"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "@/lib/hooks/storeHooks";
import { UserFormType } from "@/types/interfaces/form";

import { PATHS } from "@/routes.config";
import { config } from "@/lib/form-configs/userConfig";

import {
  asyncSetUserInfo,
  asyncSetUiDataForRetreive,
  asyncSetCanNavigateTrue,
} from "@/lib/store/thunks";

import FormProvider from "@/context/FormProvider";
import UserForm from "@/components/form/UserForm";
import Button from "@/components/Button";

const RetrievePlan = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const methods = useForm();
  const { reset } = methods;

  const onSubmit = async (user: UserFormType) => {
    await dispatch(asyncSetUserInfo(user));
    await dispatch(asyncSetUiDataForRetreive());
    await dispatch(asyncSetCanNavigateTrue());

    await new Promise((resolve) => setTimeout(resolve, 300));

    console.log("setUserInfo(user)", user);

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
