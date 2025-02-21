"use client";
import { useId } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CheckBox } from "@/types/interfaces/form";

const InputComponent = ({
  className,
  config,
  register,
  errors,
}: {
  config: CheckBox;
  className?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}) => {
  const inputId = useId();

  return (
    <div className={className}>
      <label htmlFor={inputId}>{config.label}</label>
      <input
        type="input"
        id={inputId}
        {...register(inputId, config.validation)}
        {...config.eventHandlers}
      />
      {config.hint && <div dangerouslySetInnerHTML={config.hint} />}
      {errors[inputId] && (
        <p style={{ color: "red" }}>{errors[inputId]?.message as string}</p>
      )}
    </div>
  );
};

export default InputComponent;
