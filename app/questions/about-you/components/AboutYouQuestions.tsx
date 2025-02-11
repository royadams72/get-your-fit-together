"use client";
import SelectComponent from "@/components/forms/SelectComponent";
import CheckBoxComponent from "@/components/forms/CheckBoxComponent";
import {
  alcoholConfig,
  experienceConfig,
} from "@/app/questions/about-you/form-config/config";
import { useForm } from "react-hook-form";

const AboutYouQuestions = () => {
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };
  return (
    <div>
      AboutYouQuestions questions
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectComponent
          selectConfig={experienceConfig}
          register={register}
          errors={errors}
        ></SelectComponent>
        <CheckBoxComponent
          checkboxConfig={alcoholConfig}
          register={register}
          errors={errors}
        ></CheckBoxComponent>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AboutYouQuestions;
