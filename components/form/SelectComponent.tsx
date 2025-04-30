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
  // const [optionList, setOptionList] = useState([] as SelectOption[]);
  const [optionList, setOptionList] = useState(config.options);
  const [toggleOptionBtn, setToggleOptionBtn] = useState({} as Toggle);
  const [optionIndex, setOptionIndex] = useState(0);

  useEffect(() => {
    if (defaultValue) {
      setValue(config.name, defaultValue);
    }
  }, [defaultValue, setValue, config.name]);

  useEffect(() => {
    let options = [] as SelectOption[];

    if (config.toggleOptions) {
      const formOptions = config.toggleOptions;

      const defaultOption: any = config.toggleOptions.find(
        (toggleOption, i) => {
          if (
            defaultValue?.includes(toggleOption.value) ||
            defaultValue?.includes(toggleOption.customValue as string)
          ) {
            // We need to know the index of the option that is selected
            // so we can toggle the button
            setOptionIndex(i);
            return toggleOption.value;
          } else {
            return false;
          }
        }
      );
      // Match the options to the default value i.e 25kg will load the kg options
      options = defaultOption
        ? defaultOption.toggleOption
        : formOptions[0].toggleOption;
      setOptionList(options);
      // The button to the other toggle option
      setToggleOptionBtn(formOptions[setToOtherToggleIndex(optionIndex)]);
    }
  }, []);

  useEffect(() => {
    if (!config?.toggleOptions) return;
    const formOptions = config?.toggleOptions;
    const optionList = formOptions?.[optionIndex]
      ?.toggleOption as SelectOption[];

    const toggleButtonIndexValue =
      formOptions?.[setToOtherToggleIndex(optionIndex)];
    setToggleOptionBtn(toggleButtonIndexValue);
    setOptionList(optionList);

    console.log("optionIndex", optionIndex);
  }, [optionIndex]);

  const setToOtherToggleIndex = (index: number): number =>
    index === 0 ? 1 : 0;

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValue(name, value);

    const isFieldValid = await trigger(name);
    console.log("isFieldValid", config.name, value, isFieldValid);
    if (isFieldValid) {
      dispatch(dispatchEvent({ name, value }));
    }

    config?.eventHandlers?.onChange?.(e);
  };

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
            setOptionIndex(setToOtherToggleIndex(optionIndex));
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
