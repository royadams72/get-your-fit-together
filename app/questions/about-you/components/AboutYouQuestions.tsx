"use client";
import { setAboutYou } from "@/lib/features/about-you/aboutYouSlice";
import SelectComponent from "@/components/forms/SelectComponent";
import CheckBoxComponent from "@/components/forms/CheckBoxComponent";
import {
  alcoholConfig,
  experienceConfig,
  genderConfig,
} from "@/app/questions/about-you/form-config/config";
import FormProvider from "@/context/FormProvider";
import RadioComponent from "@/components/forms/RadioComponent";

const AboutYouQuestions = () => {
  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };
  return (
    <div>
      AboutYouQuestions questions
      <FormProvider onSubmit={onSubmit}>
        <SelectComponent
          dispatchEvent={setAboutYou}
          config={experienceConfig}
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
