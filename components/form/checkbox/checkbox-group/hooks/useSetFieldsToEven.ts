//  Adds an extra dummy field to checkboxes to make sure it's an even number.

import { useState, useEffect } from "react";
import { CheckBoxGroup } from "@/types/interfaces/form";

const useSetFieldsToEven = (
  fields: Record<"id", string>[],
  config: CheckBoxGroup,
  columns: number
) => {
  const [checkboxArray, setCheckboxArray] = useState<any[]>([]);

  useEffect(() => {
    // Combine original fields with checkbox config
    let combinedFields = fields.map((field, index) => ({
      ...config.checkboxes[index],
      id: field.id,
    }));

    // Calculate how many dummies are needed to fill last row
    const remainder = combinedFields.length % columns;
    const dummiesNeeded = remainder === 0 ? 0 : columns - remainder;

    // Add dummy fields if needed
    if (dummiesNeeded > 0) {
      const dummyFields = Array.from({ length: dummiesNeeded }, (_, i) => ({
        label: "Dummy",
        value: false,
        id: `empty-${i}`,
      }));
      combinedFields = [...combinedFields, ...dummyFields];
    }

    setCheckboxArray(combinedFields); // Always update!
  }, [config.checkboxes, fields, columns]);

  return { checkboxArray };
};

export default useSetFieldsToEven;
