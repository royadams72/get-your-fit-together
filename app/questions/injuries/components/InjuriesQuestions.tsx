"use client";
import { useRouter } from "next/navigation";

import { setInjurie } from "@/lib/features/injuries/injuriesSlice";

import {
  upperBodyConfig,
  lowerBodyConfig,
  generalConditionsConfig,
  medicalRestrictionsConfig,
  foodAllergiesConfig,
  otherSensitivitiesConfig,
} from "./form-configs/config";

import FormProvider from "@/context/FormProvider";
import SelectComponent from "@/components/forms/SelectComponent";

const InjuriesQuestions = () => {
  const router = useRouter();
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
          config={upperBodyConfig()}
        ></SelectComponent>
        <SelectComponent
          dispatchEvent={setInjurie}
          config={lowerBodyConfig()}
        ></SelectComponent>
        <SelectComponent
          dispatchEvent={setInjurie}
          config={generalConditionsConfig()}
        ></SelectComponent>
        <SelectComponent
          dispatchEvent={setInjurie}
          config={medicalRestrictionsConfig()}
        ></SelectComponent>
        <p>Allergies or Sensitivities</p>
        <SelectComponent
          dispatchEvent={setInjurie}
          config={foodAllergiesConfig()}
        ></SelectComponent>
        <SelectComponent
          dispatchEvent={setInjurie}
          config={otherSensitivitiesConfig()}
        ></SelectComponent>
        <button type="submit">Submit</button>
      </FormProvider>
    </div>
  );
};

export default InjuriesQuestions;
