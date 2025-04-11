"use client";
import { useEffect, useState } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit/react";
import { useFormContext, useFieldArray } from "react-hook-form";

import useScreenSize from "@/lib/hooks/useScreenSize";

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

  const { width } = useScreenSize();
  const [leftBottom, setLeftBottom] = useState<number>(0);
  const [rightTop, setRightTop] = useState<number>(0);

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
    const setRows = (cols: number) => {
      return Math.ceil(totalItems / cols);
    };
    const totalItems = combinedFields.length;
    let columns = 3;
    let rows = setRows(columns);
    if (width < 720) {
      columns = 2;
      rows = setRows(columns);
    }
    setLeftBottom((rows - 1) * columns + 1);
    setRightTop(columns);
  }, [combinedFields, width]);

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
        {config?.hint && (
          <div
            className={styles.checkboxDivHint}
            dangerouslySetInnerHTML={config.hint}
          />
        )}
        <div className={styles.checkboxDiv}>
          {combinedFields.map((item, index) =>
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
                  onChange={(e) =>
                    handleCheckboxChange(e, index, e.target.checked)
                  }
                  id={`${config.checkboxes[index].label}`}
                />
                <label htmlFor={`${config.checkboxes[index].label}`}></label>
              </div>
            )
          )}
        </div>
        {errors[config.name] && (
          <p className={styles.checkboxDivError}>
            {errors[config.name]?.root?.message?.toString()}
          </p>
        )}
      </fieldset>
    </div>
  );
};

export default CheckBoxGroupComponent;
