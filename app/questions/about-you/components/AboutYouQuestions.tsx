"use client";
import { useRouter } from "next/navigation";
import {
  getAboutYouState,
  setAboutYou,
} from "@/lib/features/about-you/aboutYouSlice";

import { config } from "@/app/questions/about-you/form-configs/config";

import FormProvider from "@/context/FormProvider";
import SelectComponent from "@/components/forms/SelectComponent";
import RadioComponent from "@/components/forms/RadioComponent";
import { useAppSelector } from "@/lib/hooks/storeHooks";

const AboutYouQuestions = () => {
  const aboutYou = useAppSelector(getAboutYouState);
  const router = useRouter();

  const onSubmit = () => {
    router.push("/questions/injuries");
  };
  return (
    <div>
      AboutYouQuestions questions
      <FormProvider onSubmit={onSubmit}>
        <SelectComponent
          dispatchEvent={setAboutYou}
          defaultValue={aboutYou?.experienceLevel}
          config={config.experienceConfig}
        ></SelectComponent>
        <SelectComponent
          dispatchEvent={setAboutYou}
          defaultValue={aboutYou?.age}
          config={config.ageConfig}
        ></SelectComponent>
        <RadioComponent
          defaultValue={aboutYou?.gender}
          dispatchEvent={setAboutYou}
          config={config.genderConfig}
        ></RadioComponent>
        <SelectComponent
          dispatchEvent={setAboutYou}
          defaultValue={aboutYou?.height}
          config={config.heightConfig}
        ></SelectComponent>
        <SelectComponent
          defaultValue={aboutYou?.weight}
          dispatchEvent={setAboutYou}
          config={config.weightConfig}
        ></SelectComponent>
        <SelectComponent
          defaultValue={aboutYou?.bodyType}
          dispatchEvent={setAboutYou}
          config={config.bodyTypeConfig}
        ></SelectComponent>
        <p>Injuries or Conditions</p>

        <SelectComponent
          defaultValue={aboutYou?.stressLevel}
          dispatchEvent={setAboutYou}
          config={config.stressLevelConfig}
        ></SelectComponent>
        <RadioComponent
          defaultValue={aboutYou?.smoking}
          dispatchEvent={setAboutYou}
          config={config.smokingConfig}
        ></RadioComponent>
        <SelectComponent
          defaultValue={aboutYou?.alcoholConsumption}
          dispatchEvent={setAboutYou}
          config={config.alcoholConsumptionConfig}
        ></SelectComponent>
        <SelectComponent
          defaultValue={aboutYou?.activityLevel}
          dispatchEvent={setAboutYou}
          config={config.activityLevelConfig}
        ></SelectComponent>
        <button type="submit">Submit</button>
      </FormProvider>
    </div>
  );
};

export default AboutYouQuestions;
