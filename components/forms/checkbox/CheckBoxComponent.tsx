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
}: {
  config: CheckBox;
  className?: string;
  dispatchEvent?: ActionCreatorWithPayload<any, string>;
}) => {
  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext();
  const dispatch = useAppDispatch();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked: value } = e.target;
    config?.eventHandlers?.onChange?.(e);

    setValue(name, value);

    await trigger(name);
    if (dispatchEvent) {
      dispatch(dispatchEvent({ name, value }));
    }
  };
  return (
    <div className={className}>
      <label htmlFor={config.name}>{config.label}</label>
      {config?.hint && <div dangerouslySetInnerHTML={config.hint} />}
      <input
        type="checkbox"
        id={config.name}
        {...register(config.name, config.validation)}
        {...config.eventHandlers}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      {errors[config.name] && (
        <p style={{ color: "red" }}>{errors[config.name]?.message as string}</p>
      )}
    </div>
  );
};

export default CheckBoxComponent;
