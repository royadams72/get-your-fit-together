"use client";
import { useId } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CheckBox } from "@/types/interfaces/form";

const InputComponent = ({
  className,
  inputConfig,
  register,
  errors,
}: {
  inputConfig: CheckBox;
  className?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}) => {
  const inputId = useId();

  return (
    <div className={className}>
      <label htmlFor={inputId}>{inputConfig.lable}</label>
      <input
        type="input"
        id={inputId}
        {...register(inputId, inputConfig.validation)}
        {...inputConfig.eventHandlers}
      />
      {inputConfig.hint?.text && <div>{inputConfig.hint.text}</div>}
      {errors[inputId] && (
        <p style={{ color: "red" }}>{errors[inputId]?.message as string}</p>
      )}
    </div>
  );
};

export default InputComponent;
