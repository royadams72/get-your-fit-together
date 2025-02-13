"use client";
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
  return (
    <div className={className}>
      <label htmlFor={checkboxConfig.name}>{checkboxConfig.label}</label>
      <input
        type="checkbox"
        id={checkboxConfig.name}
        {...register(checkboxConfig.name, checkboxConfig.validation)}
        {...checkboxConfig.eventHandlers}
      />
      {checkboxConfig.hint?.text && <div>{checkboxConfig.hint.text}</div>}
      {errors[checkboxConfig.name] && (
        <p style={{ color: "red" }}>
          {errors[checkboxConfig.name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CheckBoxComponent;
