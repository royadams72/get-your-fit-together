// import { useFormContext } from "react-hook-form";
import { CheckBoxGroup } from "@/types/interfaces/form";
import { useEffect } from "react";
import { UseFormSetValue, FieldValues } from "react-hook-form";

const useSetChecked = (
  defaultValue: string,
  config: CheckBoxGroup,
  setValue: UseFormSetValue<FieldValues>
) => {
  useEffect(() => {
    // console.log("Default value:", defaultValue);

    if (defaultValue) {
      const defaultChecked = config.checkboxes.map((checkbox) => {
        defaultValue.split("|").map((value) => {
          if (value.trim() === checkbox.label) {
            checkbox.value = true;
          }
        });
        return checkbox;
      });

      setValue(config.name, defaultChecked);
    }
  }, [defaultValue, setValue, config.name, config.checkboxes]);
  return config.checkboxes;
};
export default useSetChecked;
