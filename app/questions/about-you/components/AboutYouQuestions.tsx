"use client";

import { useAppSelector } from "@/lib/hooks/storeHooks";

import {
  getAboutYouState,
  setAboutYou,
} from "@/lib/features/about-you/aboutYouSlice";

import { config } from "@/app/questions/about-you/form-configs/config";

import SelectComponent from "@/components/form/SelectComponent";
import RadioComponent from "@/components/form/RadioComponent";

const AboutYouQuestions = () => {
  const aboutYou = useAppSelector(getAboutYouState);

  return (
    <div>
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
    </div>
  );
};

export default AboutYouQuestions;
