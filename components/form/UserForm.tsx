import React from "react";
import { FormValue } from "@/types/interfaces/form";
import { User } from "@/types/enums/user.enum";
import styles from "@/styles/components/form/_userForm.module.scss";

import InputComponent from "./InputComponent";

const UserForm = ({
  config,
  customMessage,
  inputValue,
}: {
  config: any;
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
          inputValue: config.isYourFitPage ? inputValue : undefined,
        };

        return (
          <div key={elName}>
            <InputComponent {...inputProps} />
            {config.isYourFitPage && isUserName && customMessage ? (
              <div className={styles.textInputDivError}>{customMessage}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default UserForm;
