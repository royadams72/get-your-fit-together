import { PATHS } from "@/routes.config";
import { redirect } from "next/navigation";

export const redirectIf = (condition: boolean, path = PATHS.ABOUT_YOU) => {
  if (condition) redirect(path);
};
