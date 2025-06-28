import { useState, useEffect } from "react";

import { User } from "@/types/enums/user.enum";
import { FormValue } from "@/types/interfaces/form";

import { checkForUser } from "@/lib/actions/checkForUser";
import { redirectOnError } from "@/lib/utils/redirectOnError";

export const useCheckIfUserNameExists = (userForm: FormValue | undefined) => {
  const [responseError, setResponseError] = useState<{
    message: string;
    messageElement: string;
  }>({ message: "", messageElement: "" });

  useEffect(() => {
    if (
      !userForm ||
      userForm.name !== User.userName ||
      userForm.name.length < 6
    )
      return;

    (async () => {
      let response: any;
      try {
        response = await checkForUser(userForm.value);

        if (response.softError) {
          setResponseError({
            message: response.message,
            messageElement: User.userName,
          });
        } else {
          setResponseError({ message: "", messageElement: "" });
        }
      } catch (error) {
        await redirectOnError(response);
        console.error("Error getting data:", error);
      }
    })();
  }, [userForm]);

  return { responseError };
};
