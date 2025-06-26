import { PATHS } from "@/routes.config";
import { ResponseObj } from "@/types/interfaces/api";
import { redirect as redirectTo } from "next/navigation";

export const redirectOnError = ({ redirect }: { redirect: boolean }) => {
  console.log("redirectOnError:::", redirect);

  if (redirect) {
    redirectTo(PATHS.ERROR as string);
  }
};
