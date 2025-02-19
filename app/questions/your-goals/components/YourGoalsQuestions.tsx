"use client";
import FormProvider from "@/context/FormProvider";
import { setGoal } from "@/lib/features/your-goals/yourGoalsSlice";
import { useRouter } from "next/navigation";
import {
  motivationLevelConfig,
  primaryGoalConfig,
  secondaryGoalConfig,
  targetTimelineConfig,
} from "../form-configs/config";
import SelectComponent from "@/components/forms/SelectComponent";

const YourGoalsQuestions = () => {
  const router = useRouter();
  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    router.push("http://localhost:3000/questions/preferences");
  };
  return (
    <div>
      <FormProvider onSubmit={onSubmit}>
        <SelectComponent
          dispatchEvent={setGoal}
          config={primaryGoalConfig()}
        ></SelectComponent>
        <SelectComponent
          dispatchEvent={setGoal}
          config={secondaryGoalConfig()}
        ></SelectComponent>
        <SelectComponent
          dispatchEvent={setGoal}
          config={motivationLevelConfig()}
        ></SelectComponent>
        <SelectComponent
          dispatchEvent={setGoal}
          config={targetTimelineConfig()}
        ></SelectComponent>
        <button type="submit">Submit</button>
      </FormProvider>
    </div>
  );
};

export default YourGoalsQuestions;
