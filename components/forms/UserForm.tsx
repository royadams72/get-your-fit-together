import { API } from "@/routes.config";
import React from "react";
import { useForm } from "react-hook-form";
import InputComponent from "./InputComponent";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const UserForm = ({
  config,
  isYourFitPage,
  dispatchEvent,
  customMessage,
  inputValue,
}: {
  config: any;
  isYourFitPage?: string;
  dispatchEvent?: ActionCreatorWithPayload<any, string>;
  customMessage?: string;
  inputValue?: string;
}) => {
  const userArr = ["userName", "password"];

  return (
    <>
      {userArr.map((elName) => {
        const isUserName = elName === "userName";
        const commonProps: any = {
          config: config[elName],
          dispatchEvent: isYourFitPage ? dispatchEvent : undefined,
        };

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
