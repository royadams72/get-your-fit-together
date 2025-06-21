import { ReactNode } from "react";
import { isNotEmpty } from "@/lib/utils/isEmpty";
import ErrorPage from "@/components/ErrorPage"; // or wherever you keep it

export type FetchResponse = {
  redirect: { error: string };
};

const handleRedirectError = (response: FetchResponse): ReactNode | null => {
  if (
    isNotEmpty(response.redirect) &&
    typeof response.redirect.error === "string"
  ) {
    const errorMsg = response.redirect.error;
    // console.log("handleRedirectError", errorMsg);
    return <ErrorPage error={errorMsg} />;
  }

  return null;
};

export default handleRedirectError;
