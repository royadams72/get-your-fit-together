"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { fetchHelper } from "@/lib/actions/fetchHelper";
import { useRedirectIfInvalidStep } from "@/lib/hooks/useRedirectIfInvalidStep";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import { useCheckIfUserNameExists } from "@/app/your-custom-fit/hooks/useCheckIfUserNameExists";

import { config } from "@/lib/form-configs/userConfig";
import { API, PATHS } from "@/routes.config";

import { getUiDataState } from "@/lib/features/ui-data/uiDataSlice";
import { selectState } from "@/lib/store/store";

import { FitPlan } from "@/types/interfaces/fitness-plan";
import { FormValue } from "@/types/interfaces/form";

import { useLoader } from "@/context/Loader/LoaderProvider";
import FormProvider from "@/context/FormProvider";
import UserForm from "@/components/form/UserForm";
import Accordion from "@/components/display-plan/Accordion";
import Button from "@/components/Button";
import JourneyButtons from "@/components/journeyNav/JourneyButtons";
import cookieAction from "@/lib/actions/cookie.action";
import { Cookie } from "@/types/enums/cookie.enum";
import { getUserFitnessPlan, setUser } from "@/lib/features/user/userSlice";
import { User } from "@/types/enums/user.enum";
import { isNotEmpty } from "@/lib/utils/isEmpty";

const YourFit = ({ userFitnessPlan }: { userFitnessPlan: FitPlan }) => {
  const [displayPlan, setDisplayPlan] = useState(userFitnessPlan);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const savedState = useAppSelector(selectState);
  const userFitnessPlanFromStore = useAppSelector(getUserFitnessPlan);
  const getUiState = useAppSelector(getUiDataState);

  const methods = useForm();
  const { reset } = methods;
  const { setLoading } = useLoader();

  const [userForm, setUserForm] = useState<FormValue>();
  const isInvalidStep = useRedirectIfInvalidStep();

  const inputVal = (val: FormValue) => {
    setUserForm(val);
  };

  const responseError = useCheckIfUserNameExists(userForm);

  const onSubmit = async (userData: any) => {
    setLoading(true);

    const response = await fetchHelper(API.SAVE_PLAN, {
      savedState,
      userData,
    });

    if (response?.success) {
      reset();

      router.push(
        `${PATHS.SUCCESS}?mode=plan&message=${encodeURIComponent(
          "Your plan has been saved"
        )}`
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isNotEmpty(userFitnessPlan)) {
      setDisplayPlan(userFitnessPlan);
      dispatch(setUser({ name: User.userFitnessPlan, value: userFitnessPlan }));
    } else {
      setDisplayPlan(userFitnessPlanFromStore as FitPlan);
    }
    (async () => {
      await cookieAction(true, Cookie.fromPrevPage);
    })();
  }, [userFitnessPlanFromStore, userFitnessPlan]);

  if (isInvalidStep) return null;

  return (
    <div>
      {displayPlan && <Accordion plan={displayPlan as FitPlan}></Accordion>}
      {!getUiState.isSignedIn && (
        <FormProvider aria-label="userForm" onSubmit={onSubmit}>
          <UserForm
            config={config(true)}
            customMessage={responseError}
            inputValue={inputVal}
          ></UserForm>
          <Button style={{ marginBottom: "5rem" }} type="submit">
            Save your plan
          </Button>
        </FormProvider>
      )}

      <JourneyButtons />
    </div>
  );
};

export default YourFit;
