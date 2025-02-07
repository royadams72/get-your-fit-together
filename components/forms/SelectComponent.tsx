"use client";
import { useId } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Select } from "@/types/interfaces/form";

const SelectComponent = ({
  className,
  selectConfig,
  register,
  errors,
}: {
  selectConfig: Select;
  className?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}) => {
  const dynamicId = useId();

  return (
    <div>
      <label htmlFor={dynamicId}>{selectConfig.lable}</label>

      <select
        id={dynamicId}
        {...register(dynamicId, selectConfig.validation)}
        {...selectConfig.eventHandlers}
      >
        {selectConfig.options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.display}
          </option>
        ))}
      </select>
      {selectConfig.hint?.text && <div>{selectConfig.hint.text}</div>}
      {errors[dynamicId] && (
        <p style={{ color: "red" }}>{errors[dynamicId]?.message as string}</p>
      )}
    </div>
  );
};

export default SelectComponent;
