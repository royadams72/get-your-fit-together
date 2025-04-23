import { KeyValueMap } from "@/types/interfaces/KeyValueMap";
import React from "react";

const CopyComponent = ({ copy }: { copy: KeyValueMap[] }) => {
  return (
    <div>
      {copy.map((element, index) => {
        const elementKey = Object.keys(element)[0];
        const elementValue = element[elementKey];

        return React.createElement(elementKey, { key: index }, elementValue);
      })}
    </div>
  );
};

export default CopyComponent;
