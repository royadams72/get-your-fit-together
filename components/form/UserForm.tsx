import React from "react";
import { FormValue } from "@/types/interfaces/form";
import { User } from "@/types/enums/user.enum";
import styles from "@/styles/components/form/_userForm.module.scss";

import InputComponent from "./InputComponent";

const UserForm = ({
  title,
  config,
  customMessage,
  inputValue,
}: {
  title: string;
  config: any;
  customMessage?: { message: string; messageElement: string };
  inputValue?: (val: FormValue) => void;
}) => {
  const userArr = [User.userName, User.userPassword];

  return (
    <div className={styles.userFormContainer}>
      <h3> {title}</h3>
      {userArr.map((elName) => {
        const inputProps: any = {
          config: config[elName],
          inputValue: config.isYourFitPage ? inputValue : undefined,
        };

        return (
          <div key={elName}>
            <InputComponent {...inputProps} />
            {customMessage?.messageElement === elName ? (
              <div className={styles.textInputDivError}>
                {customMessage.message}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default UserForm;
