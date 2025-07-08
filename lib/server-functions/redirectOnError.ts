import { redirect as redirectTo } from "next/navigation";
import { PATHS } from "@/routes.config";

import { ResponseObj } from "@/types/interfaces/response";
import { writeError } from "../actions/writeError";

export const redirectOnError = async ({
  message,
  redirect,
  softError,
}: ResponseObj) => {
  if (redirect && message) {
    await writeError(message);
    redirectTo(PATHS.ERROR as string);
  }

  return softError ? { message, softError } : { message };
};
