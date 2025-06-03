import { useState } from "react";

export const UseResponseError = ({
  error,
  input,
}: {
  error: string;
  input: string;
}) => {
  const [responseError, setResponseError] = useState<{
    message: string;
    messageElement: string;
  }>({ message: "", messageElement: "" });

  const setError = () => {
    setResponseError({
      message: error,
      messageElement: input,
    });
  };
  return { responseError, setError };
};
