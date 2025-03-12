"use client";

import {
  setGoal,
  getYourGoalsState,
} from "@/lib/features/your-goals/yourGoalsSlice";

import { useAppSelector } from "@/lib/hooks/storeHooks";
import { config } from "../form-configs/config";
import SelectComponent from "@/components/forms/SelectComponent";

const YourGoalsQuestions = () => {
  const goals = useAppSelector(getYourGoalsState);

  return (
    <div>
      {/* <FormProvider onSubmit={onSubmit}> */}
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
      {/* <button type="submit">Submit</button> */}
      {/* </FormProvider> */}
    </div>
  );
};

export default YourGoalsQuestions;
