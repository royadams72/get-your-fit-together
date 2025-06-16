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

import {
  getUiDataState,
  setUiDataForRetreive,
} from "@/lib/features/uiData/uiDataSlice";
import { selectState, setStore } from "@/lib/store/store";

import { FitPlan } from "@/types/interfaces/fitness-plan";
import { FormValue } from "@/types/interfaces/form";
import { isNotEmpty } from "@/lib/utils/isEmpty";
import { RootState } from "@/types/interfaces/store";

// import { useLoader } from "@/context/Loader/LoaderProvider";
import FormProvider from "@/context/FormProvider";
import UserForm from "@/components/form/UserForm";
import Accordion from "@/components/display-plan/Accordion";
import Button from "@/components/Button";
import JourneyButtons from "@/components/journeyNav/JourneyButtons";
import cookieAction from "@/lib/actions/cookie.action";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
import { getUserFitnessPlan } from "@/lib/features/user/userSlice";

import {
  setCanNavigateTrue,
  setRoutesForYourFit,
} from "@/lib/features/journey/journeySlice";

import { isAnyFieldEmpty } from "@/lib/utils/isAnyFieldEmpty";
// (async () => {
//   await cookieAction(CookieAction.delete, [
//     Cookie.fromPrevPage,
//     Cookie.userData,
//   ]);
// })();
const YourFit = () => {
  // console.log("YourFit::)", userFitnessPlan);
  // const [displayPlan, setDisplayPlan] = useState();
  const [userForm, setUserForm] = useState<FormValue>();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const savedState = useAppSelector(selectState);
  // console.log("YourFit loaded::", savedState);
  const userFitnessPlan = useAppSelector(getUserFitnessPlan);
  const getUiState = useAppSelector(getUiDataState);

  const methods = useForm();
  const { reset } = methods;

  const responseError = useCheckIfUserNameExists(userForm);

  const inputVal = (val: FormValue) => {
    setUserForm(val);
  };
  const onSubmit = async (userData: any) => {
    // setLoading(true);

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
      // setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log("savedState::::::", savedState);
  // }, []);

  // if (isSessionData) return null;
  return (
    <div>
      {userFitnessPlan && (
        <Accordion plan={userFitnessPlan as FitPlan}></Accordion>
      )}
      {!getUiState.isSignedIn && (
        <FormProvider aria-label="userForm" onSubmit={onSubmit}>
          <UserForm
            title={"Create a username and password to save your plan:"}
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
