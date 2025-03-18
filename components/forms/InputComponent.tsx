"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/types/interfaces/form";
import { useAppDispatch } from "@/lib/hooks/storeHooks";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const InputComponent = ({
  className,
  config,
  dispatchEvent,
  customMessage,
}: {
  config: Input;
  className?: string;
  dispatchEvent?: ActionCreatorWithPayload<any, string>;
  customMessage?: string;
}) => {
  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext();
  const dispatch = useAppDispatch();

  const minLength =
    typeof config?.validation?.minLength === "object"
      ? config?.validation?.minLength?.value || 3
      : config?.validation?.minLength || 3;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value.length < minLength) return;

    setValue(name, value);

    await trigger(name);
    if (dispatchEvent) {
      dispatch(dispatchEvent({ name, value }));
    }
    config?.eventHandlers?.onChange?.(e);
  };
  return (
    <div className={className}>
      <label htmlFor={config.name}>{config.label}</label>
      <input
        type={config.isPassword ? "password" : "text"}
        id={config.name}
        {...register(config.name, config.validation)}
        {...config.eventHandlers}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      {config.hint && <div dangerouslySetInnerHTML={config.hint} />}
      {errors[config.name] && (
        <p style={{ color: "red" }}>{errors[config.name]?.message as string}</p>
      )}
      {customMessage && <p style={{ color: "red" }}>{customMessage}</p>}
    </div>
  );
};

export default InputComponent;
