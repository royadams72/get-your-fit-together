"use client";
import { useAppSelector } from "@/lib/hooks/storeHooks";
import {
  setInjurie,
  getInjuriesState,
} from "@/lib/features/injuries/injuriesSlice";

import { config } from "../form-configs/config";

import SelectComponent from "@/components/form/SelectComponent";

const InjuriesQuestions = () => {
  const injuries = useAppSelector(getInjuriesState);

  return (
    <div>
      <SelectComponent
        dispatchEvent={setInjurie}
        defaultValue={injuries?.upperBody}
        config={config.upperBodyConfig}
      />
      <SelectComponent
        dispatchEvent={setInjurie}
        defaultValue={injuries?.lowerBody}
        config={config.lowerBodyConfig}
      />
      <SelectComponent
        dispatchEvent={setInjurie}
        defaultValue={injuries?.generalConditions}
        config={config.generalConditionsConfig}
      />
      <SelectComponent
        dispatchEvent={setInjurie}
        defaultValue={injuries?.medicalRestrictions}
        config={config.medicalRestrictionsConfig}
      />

      <SelectComponent
        dispatchEvent={setInjurie}
        defaultValue={injuries?.foodAllergies}
        config={config.foodAllergiesConfig}
      />
      <SelectComponent
        dispatchEvent={setInjurie}
        defaultValue={injuries?.otherSensitivities}
        config={config.otherSensitivitiesConfig}
      />
    </div>
  );
};

export default InjuriesQuestions;
