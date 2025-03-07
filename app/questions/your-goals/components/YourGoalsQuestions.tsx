"use client";
import FormProvider from "@/context/FormProvider";
import {
  setGoal,
  getYourGoalsState,
} from "@/lib/features/your-goals/yourGoalsSlice";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks/storeHooks";
import { useEffect } from "react";
import { isNotEmpty } from "@/lib/utils/validation";
import { config } from "../form-configs/config";
import SelectComponent from "@/components/forms/SelectComponent";

const YourGoalsQuestions = () => {
  const goals = useAppSelector(getYourGoalsState);
  const router = useRouter();

  const onSubmit = (data: any) => {
    router.push("/questions/preferences");
  };

  return (
    <div>
      <FormProvider onSubmit={onSubmit}>
        <SelectComponent
          dispatchEvent={setGoal}
          defaultValue={goals?.primaryGoal}
          config={config.primaryGoalConfig}
        />
        <SelectComponent
          dispatchEvent={setGoal}
          defaultValue={goals?.secondaryGoal}
          config={config.secondaryGoalConfig}
        />
        <SelectComponent
          dispatchEvent={setGoal}
          defaultValue={goals?.motivationLevel}
          config={config.motivationLevelConfig}
        />
        <SelectComponent
          dispatchEvent={setGoal}
          defaultValue={goals?.targetTimeline}
          config={config.targetTimelineConfig}
        />
        <button type="submit">Submit</button>
      </FormProvider>
    </div>
  );
};

export default YourGoalsQuestions;
