"use client";
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

const CheckBoxGroup = ({
  name, // Unique name for the field array
  checkboxes, // Array of checkbox options (label, value)
  groupName, // Group name for validation
}: {
  name: string;
  checkboxes: { label: string; value: boolean }[];
  groupName: string;
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
      validate: (fieldArrayValues) => {
        // fieldArrayValues is an array representing the state of checkboxes
        const isAnySelected = fieldArrayValues.some(
          (field: any) => field.value
        ); // Check if any checkbox is selected
        if (!isAnySelected) {
          return "At least one checkbox must be selected";
        }
        return true; // If validation passes, return true
      },
    },
  });

  // Combine checkboxes data with the fields array (use `id` for unique identification)
  const combinedFields = fields.map((field, index) => ({
    ...checkboxes[index], // Get label and value from checkboxes prop
    id: field.id, // Include the id provided by `useFieldArray`
    fieldIndex: index, // Add the index for use in handling events
  }));

  // Handle checkbox state change
  const handleCheckboxChange = (index: number, checked: boolean) => {
    // Update the value of the checkbox dynamically
    const updatedValues = [...checkboxes]; // Copy the array to update it
    updatedValues[index].value = checked; // Update the value at the selected index
    console.log(updatedValues);

    // Set the updated array as the new value for the group
    setValue(
      groupName,
      updatedValues.map((item) => item.value),
      { shouldValidate: true }
    );

    // Check if at least one checkbox is checked in the group
    const checkedCount = updatedValues.filter((item) => item.value).length;
    console.log(checkedCount > 0);

    setValue(groupName, checkedCount > 0, { shouldValidate: true });

    // Trigger validation for the group
    trigger(groupName);
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
            onChange={(e) => handleCheckboxChange(index, e.target.checked)}
          />
          <label>{item.label}</label>
        </div>
      ))}
      {errors[groupName] && (
        <p style={{ color: "red" }}>
          At least one checkbox must be selected in {groupName}.
        </p>
      )}
    </div>
  );
};

export default CheckBoxGroup;
