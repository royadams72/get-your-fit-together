"use client";
import { useEffect } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit/react";
import { useFormContext, useFieldArray } from "react-hook-form";

import { CheckBoxGroup } from "@/types/interfaces/form";
import { useAppDispatch } from "@/lib/hooks/storeHooks";

import styles from "@/styles/components/_checkbox.module.scss";

const CheckBoxGroupComponent = ({
  config,
  required,
  dispatchEvent,
  defaultValue,
}: {
  config: CheckBoxGroup;
  required: boolean;
  dispatchEvent: ActionCreatorWithPayload<any, string>;
  defaultValue?: string;
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

  const combinedFields = fields.map((field, index) => ({
    ...config.checkboxes[index],
    id: field.id,
  }));

  useEffect(() => {
    if (defaultValue) {
      const defaultChecked = config.checkboxes.map((checkbox) => {
        defaultValue.split(",").map((value) => {
          if (value.trim() === checkbox.label) {
            checkbox.value = true;
          }
        });
        return checkbox;
      });

      setValue(config.name, defaultChecked);
    }
  }, [defaultValue, setValue, config.name, config.checkboxes]);

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
        {config?.hint && <div dangerouslySetInnerHTML={config.hint} />}
        <div className={styles.checkboxDiv}>
          {combinedFields.map((item, index) => (
            <div key={item.id}>
              <span>{item.label}</span>
              <input
                {...register(`${config.name}[${index}].value`)}
                type="checkbox"
                checked={item.value}
                onChange={(e) =>
                  handleCheckboxChange(e, index, e.target.checked)
                }
                id={`${config.checkboxes[index].label}`}
              />
              <label htmlFor={`${config.checkboxes[index].label}`}></label>
            </div>
          ))}
        </div>
        {errors[config.name] && (
          <p style={{ color: "red" }}>
            {errors[config.name]?.root?.message?.toString()}
          </p>
        )}
      </fieldset>
    </div>
  );
};

export default CheckBoxGroupComponent;
