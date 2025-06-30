import { ResponseType } from "@/types/enums/response.enum";
import { AppError } from "@/lib/utils/appError";
import { ResponseObj } from "@/types/interfaces/response";

export function response(
  message: string,
  action?: ResponseType,
  isError?: boolean,
  isServerAction = false
): ResponseObj {
  if (action === ResponseType.redirect) {
    if (!isServerAction) throw new AppError(message, action);
    return { message, redirect: true, isError };
  }

  if (action === ResponseType.softError) {
    return { message, softError: true };
  }

  return { message };
}
