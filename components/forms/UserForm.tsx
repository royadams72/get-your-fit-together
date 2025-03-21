import React from "react";
import InputComponent from "./InputComponent";
import { FormValue } from "@/types/interfaces/form";
import { User } from "@/types/enums/user.enum";

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
  const userArr = [User.userName, User.userPassword];

  return (
    <>
      {userArr.map((elName) => {
        const isUserName = elName === User.userName;

        const inputProps: any = {
          config: config[elName],
          inputValue: isYourFitPage ? inputValue : undefined,
          customMessage:
            isYourFitPage && isUserName ? customMessage : undefined,
        };

        return <InputComponent key={elName} {...inputProps} />;
      })}
    </>
  );
};

export default UserForm;
