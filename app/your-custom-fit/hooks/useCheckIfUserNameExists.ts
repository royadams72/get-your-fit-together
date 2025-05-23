import { useState, useEffect } from "react";

import { API } from "@/routes.config";

import { User } from "@/types/enums/user.enum";
import { FormValue } from "@/types/interfaces/form";

import { useClientFetch } from "@/lib/services/clientFetch";

export const useCheckIfUserNameExists = (userForm: FormValue | undefined) => {
  const clientFetch = useClientFetch();
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
        const response = await clientFetch(API.CHECK_USER, userForm.value);

        if (response.error) {
          setResponseError({
            message: response.error,
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
