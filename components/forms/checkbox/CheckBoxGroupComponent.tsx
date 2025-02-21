"use client";
import { useAppDispatch } from "@/lib/hooks/storeHooks";
import { CheckBoxGroup } from "@/types/interfaces/form";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit/react";

import { useFormContext, useFieldArray } from "react-hook-form";

const CheckBoxGroupComponent = ({
  config,
  required,
  dispatchEvent,
}: {
  config: CheckBoxGroup;
  required: boolean;
  dispatchEvent: ActionCreatorWithPayload<any, string>;
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
        const isAnySelected = fieldArrayValues.some(
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
    // Custom onChange set is config files
    config.eventHandlers?.onChange?.(e);
  };

  return (
    <fieldset>
      <legend>{config.legend}</legend>
      {config?.hint && <div dangerouslySetInnerHTML={config.hint} />}
      {combinedFields.map((item, index) => (
        <div key={item.id}>
          <label>{item.label}</label>
          <input
            {...register(`${config.name}[${index}].value`)}
            type="checkbox"
            checked={item.value}
            onChange={(e) => handleCheckboxChange(e, index, e.target.checked)}
          />
        </div>
      ))}
      {errors[config.name] && (
        <p style={{ color: "red" }}>
          {errors[config.name]?.root?.message?.toString()}
        </p>
      )}
    </fieldset>
  );
};

export default CheckBoxGroupComponent;
