"use client";
import { setAboutYou } from "@/lib/features/about-you/aboutYouSlice";
import SelectComponent from "@/components/forms/SelectComponent";
import CheckBoxComponent from "@/components/forms/CheckBoxComponent";
import {
  ageConfig,
  alcoholConfig,
  experienceConfig,
  genderConfig,
  heightConfig,
} from "@/app/questions/about-you/form-configs/config";
import FormProvider from "@/context/FormProvider";
import RadioComponent from "@/components/forms/RadioComponent";
import { useState } from "react";
import { HeightUnit } from "../form-configs/heightOptions";

const AboutYouQuestions = () => {
  const [aboutYou, setAboutYouState] = useState({
    height: { unit: "Ft" as HeightUnit, value: "" },
  });
  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
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
        <SelectComponent
          dispatchEvent={setAboutYou}
          config={heightConfig({ unit: aboutYou.height.unit })}
        ></SelectComponent>
        <RadioComponent
          config={genderConfig}
          dispatchEvent={setAboutYou}
        ></RadioComponent>
        {/* <CheckBoxComponent
          checkboxConfig={alcoholConfig}
      dispatchEvent={setAboutYou}
        ></CheckBoxComponent> */}

        <button type="submit">Submit</button>
      </FormProvider>
    </div>
  );
};

export default AboutYouQuestions;
