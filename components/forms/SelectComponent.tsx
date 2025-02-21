"use client";
import { useFormContext } from "react-hook-form";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import { Select } from "@/types/interfaces/form";
import { useAppDispatch } from "@/lib/hooks/storeHooks";
import { useState } from "react";

const SelectComponent = ({
  className,
  config,
  dispatchEvent,
}: {
  config: Select;
  className?: string;
  dispatchEvent: ActionCreatorWithPayload<any, string>;
}) => {
  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext();

  const dispatch = useAppDispatch();
  const [optionList, setOptionList] = useState(config.options);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValue(name, value);

    const isFieldValid = await trigger(name);
    if (isFieldValid) {
      dispatch(dispatchEvent({ name, value }));
    }
    // Add any onChange event handlers from config
    config?.eventHandlers?.onChange?.(e);
  };

  return (
    <div>
      <label htmlFor={config.name}>{config.label}</label>
      {config?.hint && <div dangerouslySetInnerHTML={config.hint} />}

      <select
        id={config.name}
        {...register(config.name, config.validation)}
        {...config.eventHandlers}
        onChange={(e) => handleChange(e)}
      >
        {optionList.map((option, i) => (
          <option key={i} value={option.value as string}>
            {option.display}
          </option>
        ))}
      </select>
      {errors[config.name] && (
        <p style={{ color: "red" }}>{errors[config.name]?.message as string}</p>
      )}
      <ul>
        {config.toggleOptions &&
          config.toggleOptions.map((option: any) => {
            return (
              <li
                key={option.value}
                onClick={() => setOptionList(option.toggleOption)}
              >
                {option.label}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SelectComponent;
