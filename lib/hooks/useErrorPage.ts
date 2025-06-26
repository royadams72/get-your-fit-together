import { ResponseObj } from "@/types/interfaces/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useErrorPage = () => {
  const router = useRouter();
  const [errorRedirect, setErrorRedirect] = useState<string | null>(null);

  useEffect(() => {
    if (errorRedirect) {
      router.replace(errorRedirect);
    }
  }, [errorRedirect]);

  const redirectIfError = (response: ResponseObj) => {
    if (
      response &&
      typeof response === "object" &&
      response.redirect &&
      typeof response.message === "string" &&
      response.redirectTo
    ) {
      console.log(response.message);

      setErrorRedirect(response.redirectTo);
      return true;
    }
    return false;
  };

  return { redirectIfError };
};
