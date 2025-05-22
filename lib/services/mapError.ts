import { ErrorObj, MappedError, ResponseOptions } from "@/types/interfaces/api";

export const mapErrorResponse = (
  error: string,
  status: number,
  redirect?: boolean
): MappedError => {
  const errObject: ErrorObj = {
    error,
    redirect: redirect || true,
  };

  const responseOptions: ResponseOptions = {
    status,
  };
  return { errObject, responseOptions };
};
