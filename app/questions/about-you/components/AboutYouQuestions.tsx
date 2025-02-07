"use client";
import { useForm } from "react-hook-form";
import SelectComponent from "@/components/forms/SelectComponent";
import { CheckBox, Input, Select } from "@/types/interfaces/form";
import CheckBoxComponent from "@/components/forms/CheckBoxComponent";
import InputComponent from "@/components/forms/InputComponent";

const AboutYouQuestions = () => {
  const config: Select = {
    name: "SelectName",
    lable: "this is the lable",
    options: [
      { value: "", display: "Select an option" },
      { value: "beginner", display: "Beginner" },
      { value: "intermediate", display: "Intermediate" },
      { value: "advanced", display: "Advanced" },
    ],
    hint: { text: "this is a hint" },
    validation: {
      required: "Please select an option",
    },
  };

  const config2: CheckBox = {
    name: "checkName",
    lable: "lable for checkbox",
    validation: {
      required: "Please select an option",
    },
    eventHandlers: { onClick: (e: any) => console.log(e.target.value) },
  };

  const config3: Input = {
    name: "InputName",
    lable: "lable for input",
    validation: {
      required: "Please select an option",
    },
    eventHandlers: { onChange: (e: any) => console.log(e.target.value) },
  };
  const {
    register,

    handleSubmit,
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
          selectConfig={config}
          register={register}
          errors={errors}
        ></SelectComponent>
        <CheckBoxComponent
          checkboxConfig={config2}
          register={register}
          errors={errors}
        ></CheckBoxComponent>
        <InputComponent
          inputConfig={config3}
          register={register}
          errors={errors}
        ></InputComponent>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AboutYouQuestions;
