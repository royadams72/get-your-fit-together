"use client";
import { PATHS } from "@/routes.config";

import { ResponseObj } from "@/types/interfaces/response";
import { writeError } from "@/lib/actions/writeError";
import { useRouter } from "next/navigation";
import { Storage } from "@/types/enums/cookie.enum";

export const useRedirectOnError = () => {
  const router = useRouter();
  const handleClientErrorRedirect = ({ message, redirect }: ResponseObj) => {
    if (redirect && message) {
      (async () => {
        sessionStorage.removeItem(Storage.reduxStore);
        await writeError(message);
        router.replace(PATHS.ERROR as string);
      })();
    }
  };
  return handleClientErrorRedirect;
};
