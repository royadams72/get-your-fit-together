import { useEffect } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useFormContext } from "react-hook-form";

import { Radio } from "@/types/interfaces/form";
import { useAppDispatch } from "@/lib/hooks/storeHooks";

import styles from "@/styles/components/form/_radioComponent.module.scss";

const RadioComponent = ({
  className,
  config,
  dispatchEvent,
  defaultValue,
}: {
  config: Radio;
  className?: string;
  dispatchEvent?: ActionCreatorWithPayload<any, string>;
  defaultValue?: string;
}) => {
  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (defaultValue) {
      setValue(config.name, defaultValue);
    }
  }, [defaultValue, setValue, config.name]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name, value);

    const isFieldValid = await trigger(name); // Triggers validation for the specific field
    if (isFieldValid && dispatchEvent) {
      dispatch(dispatchEvent({ name, value }));
    }

    config?.eventHandlers?.onChange?.(e);
  };

  return (
    <div className={styles.radioDiv}>
      <fieldset className={`${className || null}`}>
        <legend>{config.legend}</legend>
        {config.options.map((option, i) => {
          return (
            <div key={i} className={styles.radioOption}>
              <input
                {...register(config.name, config.validation)}
                {...config.eventHandlers}
                onChange={handleChange}
                type="radio"
                id={option.id}
                name={config.name}
                value={option.value}
                defaultChecked={defaultValue === option.value}
                aria-describedby={
                  errors[config.name]
                    ? `${config.name}-error ${config.name}-hint`
                    : config?.hint
                    ? `${config.name}-hint`
                    : undefined
                }
              />
              <label htmlFor={option.id}>{option.label}</label>
              {config?.hint && (
                <div
                  dangerouslySetInnerHTML={config.hint}
                  id={`${config.name}-hint`}
                />
              )}
            </div>
          );
        })}
      </fieldset>
      {errors[config.name] && (
        <p
          className={styles.radioDivError}
          id={`${config.name}-error`}
          aria-live="polite"
        >
          {errors[config.name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default RadioComponent;
