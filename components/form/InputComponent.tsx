"use client";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useFormContext } from "react-hook-form";
import { Input } from "@/types/interfaces/form";
import { useAppDispatch } from "@/lib/hooks/storeHooks";
import styles from "@/styles/components/form/_commonStyles.module.scss";

const InputComponent = ({
  className,
  config,
  dispatchEvent,
  inputValue,
}: {
  config: Input;
  className?: string;
  dispatchEvent?: ActionCreatorWithPayload<any, string>;
  inputValue?: ({ name, value }: { name: string; value: string }) => void;
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
    inputValue?.({ name, value });
    if (value.length < minLength) return;

    setValue(name, value);

    await trigger(name);
    if (dispatchEvent) {
      dispatch(dispatchEvent({ name, value }));
    }
    config?.eventHandlers?.onChange?.(e);
  };
  return (
    <div
      className={`${styles.textInputDiv} ${className ? " " + className : ""}`}
    >
      <label htmlFor={config.name}>{config.label}</label>
      <input
        aria-describedby={
          errors[config.name]
            ? `${config.name}-error ${config.name}-hint`
            : config?.hint
            ? `${config.name}-hint`
            : undefined
        }
        type={config.isPassword ? "password" : "text"}
        id={config.name}
        placeholder={config.placeHolder}
        {...register(config.name, config.validation)}
        {...config.eventHandlers}
        onChange={handleChange}
      />
      {config.hint && (
        <div
          id={`${config.name}-hint}`}
          className={styles.textInputDivHint}
          dangerouslySetInnerHTML={config.hint}
        />
      )}
      {errors[config.name] && (
        <p
          className={styles.textInputDivError}
          id={`${config.name}-error`}
          aria-live="polite"
        >
          {errors[config.name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default InputComponent;
