import { redirect } from "next/navigation";
import { PATHS } from "@/routes.config";
import { isNotEmpty } from "../utils/isEmpty";

const errRedirectURI = (resObjString: any) => {
  return `${PATHS.ERROR}?error=${encodeURIComponent(resObjString)}`;
};

export const fetchHelper = async <T = Record<string, unknown>>(
  url: string,
  args: T | string
) => {
  try {
    const res: any = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(args),
    });

    const response = await res.json();
    // console.log("fetchHelper::", response);

    if (response.redirect && isNotEmpty(response.error)) {
      return redirect(errRedirectURI(response.error));
    }

    return response;
  } catch (error) {
    return redirect(errRedirectURI(`Error: ${error}`));
  }
};
