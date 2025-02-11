"use client";
import { UseFormRegister, FieldErrors, useForm } from "react-hook-form";
import { Select } from "@/types/interfaces/form";
import React, { useEffect } from "react";

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
  const { setValue, trigger } = useForm();

  const handleChange = async (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    selectConfig?.eventHandlers?.onChange?.(
      e as React.ChangeEvent<HTMLSelectElement>
    );
    // extraOnChangeEvent?.(e);
    const { name } = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;

    const isFieldValid = await trigger(name); // Triggers validation for the specific field
    console.log(`${name} is ${isFieldValid ? "valid" : "invalid"}`);
  };
  return (
    <div>
      <label htmlFor={selectConfig.name}>{selectConfig.lable}</label>

      <select
        id={selectConfig.name}
        {...register(selectConfig.name, selectConfig.validation)}
        {...selectConfig.eventHandlers}
        onChange={handleChange}
      >
        {selectConfig.options.map((option, i) => (
          <option key={i} value={option.value as string}>
            {option.display}
          </option>
        ))}
      </select>
      {selectConfig.hint?.text && <div>{selectConfig.hint.text}</div>}
      {errors[selectConfig.name] && (
        <p style={{ color: "red" }}>
          {errors[selectConfig.name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default SelectComponent;
