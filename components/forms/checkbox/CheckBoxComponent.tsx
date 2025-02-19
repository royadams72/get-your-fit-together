"use client";
import { useFormContext } from "react-hook-form";
import { CheckBox } from "@/types/interfaces/form";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit/";
import { useAppDispatch } from "@/lib/hooks/storeHooks";
import { useState } from "react";

const CheckBoxComponent = ({
  className,
  config,
  dispatchEvent,
  handleGroupChange,
}: {
  config: CheckBox;
  className?: string;
  dispatchEvent?: ActionCreatorWithPayload<any, string>;
  handleGroupChange?: () => void;
}) => {
  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext();
  const dispatch = useAppDispatch();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Add any onChange event handlers from config

    const { name, checked: value } = e.target;
    handleGroupChange?.();
    config?.eventHandlers?.onChange?.(e);
    console.log(name);

    setValue(name, value);

    const isFieldValid = await trigger(name); // Triggers validation for the specific field
    if (isFieldValid && dispatchEvent) {
      dispatch(dispatchEvent({ name, value }));
    }
  };
  return (
    <div className={className}>
      <label htmlFor={config.name}>{config.label}</label>
      <input
        type="checkbox"
        id={config.name}
        {...register(config.name, config.validation)}
        {...config.eventHandlers}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      {config.hint?.text && <div>{config.hint.text}</div>}
      {errors[config.name] && (
        <p style={{ color: "red" }}>{errors[config.name]?.message as string}</p>
      )}
    </div>
  );
};

export default CheckBoxComponent;
