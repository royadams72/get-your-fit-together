"use client";

import { useMemo, useState } from "react";
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
import { getUserFitnessPlan } from "@/lib/features/user/userSlice";
import { setCanNavigateTrue } from "@/lib/features/journey/journeySlice";
import { setUiDataForRetreive } from "@/lib/features/ui-data/uiDataSlice";

import { useLoader } from "@/context/Loader/LoaderProvider";
import FormProvider from "@/context/FormProvider";
import UserForm from "@/components/form/UserForm";
import Accordion from "@/components/display-plan/Accordion";
import Button from "@/components/Button";
import setCookiesAndSaveState from "@/lib/actions/setCookiesAndSaveState";
import { useRouter } from "next/navigation";
import StoreProvider from "@/app/StoreProvider";

const RetrieveYourPlan = () => {
  const router = useRouter();
  const [responseError, setResponseError] = useState<{
    message: string;
    messageElement: string;
  }>({ message: "", messageElement: "" });

  const methods = useForm();
  const { reset } = methods;

  const onSubmit = async (data: any) => {
    // try {
    // setLoading(true);
    // console.log("res", data);
    await setCookiesAndSaveState({} as RootState, data);

    router.push(PATHS.YOUR_FIT);
    // const response = await fetchHelper({}, data);

    // if (!response) return;

    // if (response.error) {
    //   setResponseError({
    //     message: response.error,
    //     messageElement: User.userPassword,
    //   });
    reset();
    return;
  };

  return (
    <div>
      <StoreProvider>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <UserForm
            title={"Enter your user name and password to retrieve your plan:"}
            customMessage={responseError}
            config={config(false)}
          />
          <Button type="submit">Retrieve Your Plan</Button>
        </FormProvider>
      </StoreProvider>
    </div>
  );
};
export default RetrieveYourPlan;
