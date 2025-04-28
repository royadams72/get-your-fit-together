"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import { Select, SelectOption, Toggle } from "@/types/interfaces/form";
import { useAppDispatch } from "@/lib/hooks/storeHooks";
import styles from "@/styles/components/form/_selectComponent.module.scss";

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
  const [optionList, setOptionList] = useState([] as SelectOption[]);

  useEffect(() => {
    if (config.toggleOptions) {
      if (defaultValue) {
        const defaultOption: any = config.toggleOptions.find((option) => {
          if (
            defaultValue.includes(option.value) ||
            defaultValue.includes(option.customValue as string)
          ) {
            return option.value;
          }
        });
        console.log(defaultValue);

        console.log(defaultOption.toggleOption);
        setOptionList(defaultOption.toggleOption);
        setValue(config.name, defaultValue);
      } else {
        setOptionList(config.toggleOptions[0].toggleOption);
        setValue(config.name, config.toggleOptions[0].toggleOption[0].value);
      }
      // console.log(config.toggleOptions[0].toggleOption);
    } else {
      if (defaultValue) {
        setValue(config.name, defaultValue);
      }
      setOptionList(config.options as SelectOption[]);
      setValue(config.name, config.options?.[0]?.value ?? "");
    }
  }, []);

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
        value={defaultValue || ""}
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
        <p className={styles.selectDivError}>
          {errors[config.name]?.message as string}
        </p>
      )}
      <ul>
        {config.toggleOptions &&
          config.toggleOptions.map((option: any) => {
            return (
              <li
                className={styles.selectDivToggle}
                key={option.value}
                onClick={() => setOptionList(option.toggleOption)}
                tabIndex={1}
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
