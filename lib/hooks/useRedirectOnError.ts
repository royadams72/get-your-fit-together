"use client";
import { PATHS } from "@/routes.config";

import { ResponseObj } from "@/types/interfaces/response";
import { writeError } from "@/lib/actions/writeError";
import { useRouter } from "next/navigation";

export const useRedirectOnError = () => {
  const router = useRouter();
  const redirectClienSideError = ({
    message,
    redirect,
    softError,
  }: ResponseObj) => {
    console.log("redirectClienSideError::", message, redirect);
    if (redirect && message) {
      (async () => {
        await writeError(message);
        router.replace(PATHS.ERROR as string);
      })();
    }
  };
  return redirectClienSideError;
};
