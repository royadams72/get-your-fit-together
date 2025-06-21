import { useState } from "react";
import handleRedirectError, {
  FetchResponse,
} from "../utils/handleRedirectError";

export const useErrorPage = () => {
  const [errorComponent, setErrorComponent] = useState<React.ReactNode | null>(
    null
  );
  const redirectIfError = (response: FetchResponse) => {
    const maybeError = handleRedirectError(response);
    console.log("redirectIfError", maybeError);
    if (maybeError) {
      setErrorComponent(maybeError);
      return;
    }
  };

  return { redirectIfError, errorComponent };
};
