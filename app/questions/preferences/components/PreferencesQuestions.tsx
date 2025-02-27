"use client";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks/storeHooks";
import {
  setPreference,
  getPreferencesState,
} from "@/lib/features/preferences/preferencesSlice";
import { config } from "../form-configs/config";

import FormProvider from "@/context/FormProvider";
import CheckBoxGroupComponent from "@/components/forms/checkbox/CheckBoxGroupComponent";
import SelectComponent from "@/components/forms/SelectComponent";
import { useEffect } from "react";
import { isNotEmpty } from "@/lib/utils/validation";

const PreferencesQuestions = () => {
  const preferences = useAppSelector(getPreferencesState);
  const router = useRouter();

  useEffect(() => {
    if (isNotEmpty(preferences)) {
      console.log(preferences);
    }
  }, [preferences]);

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    router.push("/questions/your-custom-fit");
  };

  return (
    <FormProvider
      onSubmit={onSubmit}
      defaultValues={{ workoutType: config.workoutType.checkboxes }}
    >
      <CheckBoxGroupComponent
        config={config.workoutType}
        required={true}
        dispatchEvent={setPreference}
        defaultValue={preferences?.workoutType}
      />
      <SelectComponent
        config={config.equipment}
        dispatchEvent={setPreference}
        defaultValue={preferences?.equipmentAvailability}
      />
      <SelectComponent
        config={config.timePerSession}
        dispatchEvent={setPreference}
        defaultValue={preferences?.timePerSession}
      />
      <SelectComponent
        config={config.daysPerWeek}
        dispatchEvent={setPreference}
        defaultValue={preferences?.daysPerWeek}
      />
      <SelectComponent
        config={config.preferredWorkoutTime}
        dispatchEvent={setPreference}
        defaultValue={preferences?.workoutTime}
      />
      <SelectComponent
        config={config.socialPreference}
        dispatchEvent={setPreference}
        defaultValue={preferences?.socialPreference}
      />
      <button type="submit">Submit</button>
    </FormProvider>
  );
};

export default PreferencesQuestions;
