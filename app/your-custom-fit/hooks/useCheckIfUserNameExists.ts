import { useState, useEffect } from "react";

import { User } from "@/types/enums/user.enum";
import { FormValue } from "@/types/interfaces/form";

import { checkForUser } from "@/lib/actions/checkForUser";
import { redirectOnError } from "@/lib/server-functions/redirectOnError";
import { useRedirectOnError } from "@/lib/hooks/useRedirectOnError";

export const useCheckIfUserNameExists = (userForm: FormValue | undefined) => {
  const [responseError, setResponseError] = useState<{
    message: string;
    messageElement: string;
  }>({ message: "", messageElement: "" });
  const handleClientErrorRedirect = useRedirectOnError();
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
        console.log("response:", response);

        handleClientErrorRedirect(response);

        if (response.softError) {
          setResponseError({
            message: response.message,
            messageElement: User.userName,
          });
        } else {
          setResponseError({ message: "", messageElement: "" });
        }
      } catch (error) {
        console.error("Error getting data:", error);
        handleClientErrorRedirect({ message: error as string, redirect: true });
      }
    })();
  }, [userForm]);

  return { responseError };
};
