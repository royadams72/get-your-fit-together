"use client";

import {
  setGoal,
  getYourGoalsState,
} from "@/lib/features/your-goals/yourGoalsSlice";

import { useAppSelector } from "@/lib/hooks/storeHooks";
import { config } from "../form-configs/config";
import SelectComponent from "@/components/form/SelectComponent";

const YourGoals = () => {
  const goals = useAppSelector(getYourGoalsState);

  return (
    <div>
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
    </div>
  );
};

export default YourGoals;
