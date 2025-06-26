import { useState, useEffect } from "react";

import { API } from "@/routes.config";

import { User } from "@/types/enums/user.enum";
import { FormValue } from "@/types/interfaces/form";

import { fetchHelper } from "@/lib/utils/fetchHelper";
import { useErrorPage } from "@/lib/hooks/useErrorPage";
import { checkForUser } from "@/lib/actions/checkForUser";
import { ResponseObj } from "@/types/interfaces/api";

export const useCheckIfUserNameExists = (userForm: FormValue | undefined) => {
  const { redirectIfError } = useErrorPage();
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
      try {
        const response = await checkForUser(userForm.value);
        console.log("useCheckUser::", response);

        redirectIfError(response as ResponseObj);
        // // if (response.error) {
        // //   setResponseError({
        // //     message: response.message,
        // //     messageElement: User.userName,
        // //   });
        // } else {
        //   setResponseError({ message: "", messageElement: "" });
        // }
      } catch (error) {
        console.error("Error getting data:", error);
      }
    })();
  }, [userForm]);
  return { responseError };
};
