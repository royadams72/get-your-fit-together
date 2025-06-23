import { ErrorObj } from "@/types/interfaces/api";
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

  const redirectIfError = (response: ErrorObj) => {
    if (
      response &&
      typeof response === "object" &&
      response.redirect &&
      typeof response.error === "string"
    ) {
      setErrorRedirect(`/error?error=${encodeURIComponent(response.error)}`);
      return true;
    }
    return false;
  };

  return { redirectIfError };
};
