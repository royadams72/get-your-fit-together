"use client";
import { useRouter } from "next/navigation";
import { setAboutYou } from "@/lib/features/about-you/aboutYouSlice";

import {
  activityLevelConfig,
  ageConfig,
  alcoholConsumptionConfig,
  bodyTypeConfig,
  experienceConfig,
  genderConfig,
  heightConfig,
  smokingConfig,
  stressLevelConfig,
  weightConfig,
} from "@/app/questions/about-you/form-configs/config";

import FormProvider from "@/context/FormProvider";
import SelectComponent from "@/components/forms/SelectComponent";
import RadioComponent from "@/components/forms/RadioComponent";

const AboutYouQuestions = () => {
  const router = useRouter();
  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    router.push("/questions/injuries");
  };
  return (
    <div>
      AboutYouQuestions questions
      <FormProvider onSubmit={onSubmit}>
        <SelectComponent
          dispatchEvent={setAboutYou}
          config={experienceConfig()}
        ></SelectComponent>
        <SelectComponent
          dispatchEvent={setAboutYou}
          config={ageConfig}
        ></SelectComponent>
        <RadioComponent
          config={genderConfig}
          dispatchEvent={setAboutYou}
        ></RadioComponent>
        <SelectComponent
          dispatchEvent={setAboutYou}
          config={heightConfig()}
        ></SelectComponent>
        <SelectComponent
          dispatchEvent={setAboutYou}
          config={weightConfig()}
        ></SelectComponent>
        <SelectComponent
          dispatchEvent={setAboutYou}
          config={bodyTypeConfig()}
        ></SelectComponent>
        <p>Injuries or Conditions</p>

        <SelectComponent
          dispatchEvent={setAboutYou}
          config={stressLevelConfig()}
        ></SelectComponent>
        <RadioComponent
          dispatchEvent={setAboutYou}
          config={smokingConfig()}
        ></RadioComponent>
        <SelectComponent
          dispatchEvent={setAboutYou}
          config={alcoholConsumptionConfig()}
        ></SelectComponent>
        <SelectComponent
          dispatchEvent={setAboutYou}
          config={activityLevelConfig()}
        ></SelectComponent>
        <button type="submit">Submit</button>
      </FormProvider>
    </div>
  );
};

export default AboutYouQuestions;
