import { ResponseType } from "@/types/enums/response.enum";

export const response = (message: string, action?: ResponseType) => {
  const redirect = action === ResponseType.redirect;
  const softError = action === ResponseType.softError;
  return redirect ? { message, redirect } : { message, softError };
};
