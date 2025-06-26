import { redirect as redirectTo } from "next/navigation";
import { PATHS } from "@/routes.config";

export const redirectOnError = ({ redirect }: { redirect: boolean }) => {
  console.log("redirectOnError:::", redirect);

  if (redirect) {
    redirectTo(PATHS.ERROR as string);
  }
};
