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

  const redirectIfError = (response: any) => {
    if (
      response &&
      typeof response === "object" &&
      response.redirect &&
      typeof response.redirect.error === "string"
    ) {
      setErrorRedirect(
        `/error?error=${encodeURIComponent(response.redirect.error)}`
      );
      return true;
    }
    return false;
  };

  return { redirectIfError };
};
