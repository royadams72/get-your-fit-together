import React from "react";
import InputComponent from "./InputComponent";
import { FormValue } from "@/types/interfaces/form";

const UserForm = ({
  config,
  isYourFitPage,
  customMessage,
  inputValue,
}: {
  config: any;
  isYourFitPage?: boolean;
  customMessage?: string;
  inputValue?: (val: FormValue) => void;
}) => {
  const userArr = ["userName", "password"];

  return (
    <>
      {userArr.map((elName) => {
        const isUserName = elName === "userName";
        console.log(isUserName);

        const commonProps: any = {
          config: config[elName],
          // dispatchEvent: isYourFitPage ? dispatchEvent : undefined,
        };
        console.log(commonProps);

        if (isYourFitPage && isUserName) {
          return (
            <InputComponent
              {...commonProps}
              key={elName}
              customMessage={customMessage}
              inputValue={inputValue} // Use appropriate value here
            />
          );
        }

        return <InputComponent key={elName} {...commonProps} />;
      })}
    </>
  );
};

export default UserForm;
