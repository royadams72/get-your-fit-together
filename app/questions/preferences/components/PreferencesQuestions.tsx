"use client";
import { useRouter } from "next/navigation";
import FormProvider from "@/context/FormProvider";
import CheckBoxGroupComponent from "@/components/forms/checkbox/CheckBoxGroupComponent";
import { workoutType } from "../form-configs/config";
import { setPreference } from "@/lib/features/preferences/preferencesSlice";

const PreferencesQuestions = () => {
  const router = useRouter();

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    router.push("http://localhost:3000/questions/injuries");
  };

  return (
    <FormProvider
      onSubmit={onSubmit}
      defaultValues={{ workoutType: workoutType.checkboxes }}
    >
      <CheckBoxGroupComponent
        name={workoutType.name}
        config={workoutType}
        required={true}
      />

      <button type="submit">Submit</button>
    </FormProvider>
  );
};

export default PreferencesQuestions;
