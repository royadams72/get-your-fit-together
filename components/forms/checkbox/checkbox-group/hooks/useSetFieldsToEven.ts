//  Adds an extra dummy field to checkboxes to make sure it's an even number.

import { useState, useEffect } from "react";
import { CheckBoxGroup } from "@/types/interfaces/form";

const useSetFieldsToEven = (
  fields: Record<"id", string>[],
  config: CheckBoxGroup
) => {
  const [checkboxArray, setCheckboxArray] = useState<any[]>([]);
  useEffect(() => {
    let combinedFields = fields.map((field: any, index: any) => ({
      ...config.checkboxes[index],
      id: field.id,
    }));

    if (combinedFields.length % 2 !== 0) {
      combinedFields = [
        ...combinedFields,
        { label: "Dummy", value: false, id: "empty" },
      ];
      setCheckboxArray(combinedFields);
    }
  }, [config.checkboxes, fields]);
  return { checkboxArray };
};

export default useSetFieldsToEven;
