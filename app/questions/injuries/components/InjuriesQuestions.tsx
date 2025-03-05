"use client";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks/storeHooks";
import {
  setInjurie,
  getInjuriesState,
} from "@/lib/features/injuries/injuriesSlice";
import { config } from "../form-configs/config";

import FormProvider from "@/context/FormProvider";
import SelectComponent from "@/components/forms/SelectComponent";
import { useEffect } from "react";
import { isNotEmpty } from "@/lib/utils/validation";

const InjuriesQuestions = () => {
  const injuries = useAppSelector(getInjuriesState);
  const router = useRouter();

  useEffect(() => {
    if (isNotEmpty(injuries)) {
      console.log(injuries);
    }
  }, [injuries]);

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    router.push("/questions/your-goals");
  };

  return (
    <div>
      <p>Injuries</p>
      <FormProvider onSubmit={onSubmit}>
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
        <p>Allergies or Sensitivities</p>
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
        <button type="submit">Submit</button>
      </FormProvider>
    </div>
  );
};

export default InjuriesQuestions;
