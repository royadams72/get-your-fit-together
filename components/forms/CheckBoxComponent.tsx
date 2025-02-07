"use client";
import { useId } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CheckBox } from "@/types/interfaces/form";

const CheckBoxComponent = ({
  className,
  checkboxConfig,
  register,
  errors,
}: {
  checkboxConfig: CheckBox;
  className?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}) => {
  const checkboxId = useId();

  return (
    <div className={className}>
      <label htmlFor={checkboxId}>{checkboxConfig.lable}</label>
      <input
        type="checkbox"
        id={checkboxId}
        {...register(checkboxId, checkboxConfig.validation)}
        {...checkboxConfig.eventHandlers}
      />
      {checkboxConfig.hint?.text && <div>{checkboxConfig.hint.text}</div>}
      {errors[checkboxId] && (
        <p style={{ color: "red" }}>{errors[checkboxId]?.message as string}</p>
      )}
    </div>
  );
};

export default CheckBoxComponent;
