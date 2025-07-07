"use client";

import { useAppSelector } from "@/lib/hooks/storeHooks";
import {
  setPreference,
  getPreferencesState,
} from "@/lib/features/preferences/preferencesSlice";
import { config } from "@/app/(questions)/preferences/form-configs/config"; //does not work

import CheckBoxGroupComponent from "@/components/form/checkbox/checkbox-group/CheckBoxGroupComponent";
import SelectComponent from "@/components/form/SelectComponent";

const PreferencesQuestions = () => {
  const preferences = useAppSelector(getPreferencesState);
  return (
    <div>
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
    </div>
  );
};

export default PreferencesQuestions;
