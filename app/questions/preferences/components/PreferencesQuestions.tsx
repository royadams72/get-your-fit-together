"use client";
import { useRouter } from "next/navigation";
import FormProvider from "@/context/FormProvider";
import CheckBoxGroup from "@/components/forms/checkbox/CheckBoxGroup";
import { workoutTypeGroup } from "../form-configs/config";
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
      defaultValues={{ workoutType: workoutTypeGroup }}
    >
      {/* First checkbox group for workout type */}
      <CheckBoxGroup
        name="workoutType" // Unique name for the first checkbox group
        checkboxes={workoutTypeGroup} // The options for workout types
        groupName="workoutTypeGroup" // Group name for validation
      />

      <button type="submit">Submit</button>
    </FormProvider>
  );
};

export default PreferencesQuestions;
