"use client";
import { useRouter } from "next/navigation";
import FormProvider from "@/context/FormProvider";
import CheckBoxGroupComponent from "@/components/forms/checkbox/CheckBoxGroupComponent";
import { config } from "../form-configs/config";
import { setPreference } from "@/lib/features/preferences/preferencesSlice";
import SelectComponent from "@/components/forms/SelectComponent";

const PreferencesQuestions = () => {
  const router = useRouter();

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    router.push("http://localhost:3000/questions/injuries");
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
      />
      <SelectComponent
        config={config.equipment}
        dispatchEvent={setPreference}
      />
      <SelectComponent
        config={config.timePerSession}
        dispatchEvent={setPreference}
      />
      <SelectComponent
        config={config.daysPerWeek}
        dispatchEvent={setPreference}
      />
      <SelectComponent
        config={config.preferredWorkoutTime}
        dispatchEvent={setPreference}
      />
      <SelectComponent
        config={config.socialPreference}
        dispatchEvent={setPreference}
      />
      <button type="submit">Submit</button>
    </FormProvider>
  );
};

export default PreferencesQuestions;
