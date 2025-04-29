"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import { isNotEmpty } from "@/lib/utils/validation";

import { Select, SelectOption, Toggle } from "@/types/interfaces/form";
import { useAppDispatch } from "@/lib/hooks/storeHooks";

import styles from "@/styles/components/form/_selectComponent.module.scss";
import Button from "@/components/Button";

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
  const [toggleOptionBtn, setToggleOptionBtn] = useState({} as Toggle);
  const [optionIndex, setOptionIndex] = useState(0);

  useEffect(() => {
    const optionValue: string = defaultValue || "";
    let options = [] as SelectOption[];

    if (config.toggleOptions) {
      const formOptions = config.toggleOptions;
      // if (defaultValue) {
      console.log("config.toggleOptions::", config.toggleOptions);
      const defaultOption: any = config.toggleOptions.find((option, i) => {
        if (
          defaultValue?.includes(option.value) ||
          defaultValue?.includes(option.customValue as string)
        ) {
          setOptionIndex(i);
          return option.value;
        } else {
          return false;
        }
      });

      options = defaultOption
        ? defaultOption.toggleOption
        : formOptions[0].toggleOption;

      setToggleOptionBtn(formOptions[setToOtherIndex(optionIndex)]);
      setOptionList(options);
    } else {
      options = config.options as SelectOption[];
    }
    updateFormOptions(options, optionValue as string);
    setOptionList(options);
  }, []);

  useEffect(() => {
    if (!config?.toggleOptions) return;
    const formOptions = config?.toggleOptions;
    const optionList = formOptions?.[optionIndex]
      ?.toggleOption as SelectOption[];

    const toggleButtonIndexValue = formOptions?.[setToOtherIndex(optionIndex)];
    setToggleOptionBtn(toggleButtonIndexValue);
    setOptionList(optionList);
    updateFormOptions(optionList, "");
  }, [optionIndex, config?.toggleOptions]);

  const setToOtherIndex = (index: number) => (index === 0 ? 1 : 0);

  const updateFormOptions = (options: SelectOption[], optionValue: string) => {
    setOptionList(options);
    setValue(config.name, optionValue);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValue(name, value);

    const isFieldValid = await trigger(name);
    if (isFieldValid) {
      dispatch(dispatchEvent({ name, value }));
    }

    config?.eventHandlers?.onChange?.(e);
  };
  console.log("styles;;", styles);
  return (
    <div className={`${className + " " || ""} ${styles.selectDiv}`}>
      <label htmlFor={config.name}>{config.label}</label>

      <select
        id={config.name}
        value={defaultValue || ""}
        {...register(config.name, config.validation)}
        {...config.eventHandlers}
        onChange={(e) => handleChange(e)}
      >
        {optionList &&
          optionList.map((option, i) => (
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
      {isNotEmpty(toggleOptionBtn) && (
        <Button
          style={{ marginTop: "1rem" }}
          onClick={() => {
            setOptionIndex(setToOtherIndex(optionIndex));
            dispatch(dispatchEvent({ name: config.name, value: "" }));
          }}
        >
          {toggleOptionBtn.label}
        </Button>
      )}
    </div>
  );
};

export default SelectComponent;
