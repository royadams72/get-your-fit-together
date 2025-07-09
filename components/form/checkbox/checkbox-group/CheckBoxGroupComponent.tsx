"use client";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit/react";
import { useFormContext, useFieldArray } from "react-hook-form";

import { CheckBoxGroup } from "@/types/interfaces/form";
import { useAppDispatch } from "@/lib/hooks/storeHooks";

import styles from "@/styles/components/form/_checkbox.module.scss";
import useSetFieldsToEven from "./hooks/useSetFieldsToEven";
import useOnScreensizeChange from "./hooks/useOnScreensizeChange";
import useSetChecked from "./hooks/useSetChecked";

const CheckBoxGroupComponent = ({
  config,
  required,
  dispatchEvent,
  defaultValue,
}: {
  config: CheckBoxGroup;
  required: boolean;
  dispatchEvent: ActionCreatorWithPayload<any, string>;
  defaultValue?: string[];
}) => {
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const { fields } = useFieldArray({
    control,
    name: config.name,
    rules: {
      validate: (fieldArrayValues: any) => {
        if (!required) return;
        const isAnySelected = fieldArrayValues?.some(
          (field: any) => field.value
        );

        if (!isAnySelected) {
          return !config.requiredError
            ? "At least one checkbox must be selected"
            : config.requiredError;
        }
        return true;
      },
    },
  });

  const { columns, leftBottom, rightTop } = useOnScreensizeChange(
    fields.length
  );
  const { checkboxArray } = useSetFieldsToEven(fields, config, columns);

  config.checkboxes = useSetChecked(defaultValue || [], config, setValue);

  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    checked: boolean
  ) => {
    if (!required) return;

    const value = config.checkboxes[index].label;
    const updatedValues = [...config.checkboxes];
    updatedValues[index].value = checked;

    setValue(config.name, updatedValues);

    await trigger(config.name);

    dispatch(dispatchEvent({ name: config.name, value }));

    config.eventHandlers?.onChange?.(e);
  };

  return (
    <div className={styles.checkboxDivContianer}>
      <fieldset>
        <legend>{config.legend}</legend>
        {config?.hint && (
          <div
            id={`${config.name}-hint`}
            className={styles.checkboxDivHint}
            dangerouslySetInnerHTML={config.hint}
          />
        )}
        <div
          id={`${config.name}`}
          className={styles.checkboxDiv}
          style={{ "--template-columns": columns } as React.CSSProperties}
        >
          {checkboxArray &&
            checkboxArray?.map((item, index) =>
              item.label === "Dummy" ? (
                <div key={index}></div>
              ) : (
                <div
                  key={item.id}
                  className={[
                    index + 1 === leftBottom ? styles["bottom-left"] : "",
                    index + 1 === rightTop ? styles["right-top"] : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span>{item.label}</span>
                  <input
                    {...register(`${config.name}[${index}].value`)}
                    type="checkbox"
                    checked={item.value}
                    aria-checked={item.value}
                    onChange={(e) =>
                      handleCheckboxChange(e, index, e.target.checked)
                    }
                    id={`${config.checkboxes[index].label}`}
                    aria-describedby={
                      errors[config.name]
                        ? `${config.name}-error ${config.name}-hint`
                        : config?.hint
                        ? `${config.name}-hint`
                        : undefined
                    }
                  />
                  <label htmlFor={`${config.checkboxes[index].label}`}></label>
                </div>
              )
            )}
        </div>
        {errors[config.name] && (
          <p
            className={styles.checkboxDivError}
            id={`${config.name}-error`}
            aria-live="polite"
          >
            {errors[config.name]?.root?.message?.toString()}
          </p>
        )}
      </fieldset>
    </div>
  );
};

export default CheckBoxGroupComponent;
