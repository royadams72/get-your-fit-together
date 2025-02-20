"use client";
import { CheckBoxGroup } from "@/types/interfaces/form";
import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

const CheckBoxGroupComponent = ({
  name,
  config,
  required,
}: {
  name: string;
  config: CheckBoxGroup;
  required: boolean;
}) => {
  const {
    control,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name,
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
    config?.eventHandlers?.onChange?.(e);

    if (!required) return;

    const updatedValues = [...config.checkboxes];
    updatedValues[index].value = checked;

    setValue(config.name, updatedValues);

    await trigger(config.name);
  };

  return (
    <div>
      {combinedFields.map((item, index) => (
        <div key={item.id}>
          {/* Register each checkbox with a unique index */}
          <input
            {...register(`${name}[${index}].value`)} // Register with the correct index
            type="checkbox"
            checked={item.value} // Use `value` from combined data
            onChange={(e) => handleCheckboxChange(e, index, e.target.checked)}
          />
          <label>{item.label}</label>
        </div>
      ))}
      {errors[config.name] && (
        <p style={{ color: "red" }}>
          {errors[config.name]?.root?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default CheckBoxGroupComponent;
