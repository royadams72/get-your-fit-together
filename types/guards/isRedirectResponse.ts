import { ErrorObj } from "../interfaces/api";

export const isRedirectResponse = <T>(res: T | ErrorObj): res is ErrorObj => {
  return typeof res === "object" && res !== null && "redirect" in res;
};
