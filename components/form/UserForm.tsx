import React from "react";
import { FormValue } from "@/types/interfaces/form";
import { User } from "@/types/enums/user.enum";
import styles from "@/styles/components/_userForm.module.scss";

import InputComponent from "./InputComponent";

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
    <div className={styles.userFormContainer}>
      {userArr.map((elName) => {
        const isUserName = elName === User.userName;

        const inputProps: any = {
          config: config[elName],
          inputValue: isYourFitPage ? inputValue : undefined,
        };

        return (
          <div key={elName}>
            <InputComponent {...inputProps} />
            {isYourFitPage && isUserName && customMessage ? (
              <div className={styles.textInputDivError}>{customMessage}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default UserForm;
