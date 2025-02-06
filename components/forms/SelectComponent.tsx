"use client";
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
  const errorMessage = errors[selectConfig.name]?.message as string | undefined; // Ensure the type is string

  return (
    <div>
      <label htmlFor={selectConfig.name}>{selectConfig.lable}</label>

      <select {...register(selectConfig.name, selectConfig.validation)}>
        {selectConfig.options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.display}
          </option>
        ))}
      </select>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default SelectComponent;
