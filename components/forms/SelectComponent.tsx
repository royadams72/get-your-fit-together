"use client";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import styles from "@/styles/components/_selectComponent.module.scss";
import { Select } from "@/types/interfaces/form";
import { useAppDispatch } from "@/lib/hooks/storeHooks";
import { styleText } from "util";

const SelectComponent = ({
  className,
  config,
  dispatchEvent,
  defaultValue,
}: {
  config: Select;
  className?: string;
  dispatchEvent: ActionCreatorWithPayload<any, string>;
  defaultValue?: string;
}) => {
  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext();

  const dispatch = useAppDispatch();
  const [optionList, setOptionList] = useState(config.options);

  useEffect(() => {
    if (defaultValue) {
      setValue(config.name, defaultValue);
    }
  }, [defaultValue, setValue, config.name]);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValue(name, value);

    const isFieldValid = await trigger(name);
    if (isFieldValid) {
      dispatch(dispatchEvent({ name, value }));
    }

    config?.eventHandlers?.onChange?.(e);
  };

  return (
    <div className={`${className || ""} ${styles.selectDiv}`}>
      <label htmlFor={config.name}>{config.label}</label>

      <select
        id={config.name}
        defaultValue={defaultValue || ""}
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
      {config?.hint && (
        <div
          className={styles.selectDivHint}
          dangerouslySetInnerHTML={config.hint}
        />
      )}
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
