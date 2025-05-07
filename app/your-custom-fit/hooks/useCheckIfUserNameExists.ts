import { useState, useEffect } from "react";

import { API } from "@/routes.config";

import { User } from "@/types/enums/user.enum";
import { FormValue } from "@/types/interfaces/form";

export const useCheckIfUserNameExists = (userForm: FormValue | undefined) => {
  const [responseError, setResponseError] = useState<{
    message: string;
    messageElement: string;
  }>({ message: "", messageElement: "" });

  useEffect(() => {
    if (
      !userForm ||
      userForm.name !== User.userName ||
      userForm.value.length < 6
    )
      return;

    (async () => {
      try {
        const response = await fetch(`${API.CHECK_USER}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userForm.value),
        });

        const responseData = await response.json();
        if (responseData.error) {
          setResponseError({
            message: responseData.error,
            messageElement: User.userName,
          });
        } else {
          setResponseError({ message: "", messageElement: "" });
        }
      } catch (error) {
        console.error("Error getting data:", error);
      }
    })();
  }, [userForm]);
  return responseError;
};
