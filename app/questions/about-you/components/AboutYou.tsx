"use client";
import { useForm } from "react-hook-form";
import SelectComponent from "@/components/forms/SelectComponent";
import { Select } from "@/types/interfaces/form";

const AboutYou = () => {
  const config: Select = {
    name: "this is the name",
    lable: "this is the lable",
    options: [
      { value: "", display: "Select an option" },
      { value: "beginner", display: "Beginner" },
      { value: "intermediate", display: "Intermediate" },
      { value: "advanced", display: "Advanced" },
    ],
    validation: {
      required: "Please select an option",
    },
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
      AboutYou questions
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectComponent
          selectConfig={config}
          register={register}
          errors={errors}
        ></SelectComponent>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AboutYou;
