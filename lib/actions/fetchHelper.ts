import { redirect } from "next/navigation";
import { PATHS } from "@/routes.config";
import { isEmpty, isNotEmpty } from "../utils/isEmpty";

const errRedirectURI = (resObjString: any) => {
  return `${PATHS.ERROR}?error=${encodeURIComponent(resObjString)}`;
};

export const fetchHelper = async <T = Record<string, unknown>>(
  url: string,
  args?: T | string,
  method = "POST"
) => {
  const options: RequestInit = {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };

  if (isNotEmpty(args) && method !== "GET" && method !== "HEAD") {
    options.body = JSON.stringify(args);
  }
  try {
    const res: any = await fetch(url, options);

    const response = await res.json();
    console.log("fetchHelper::", response);

    if (response.redirect && isNotEmpty(response.error)) {
      return redirect(errRedirectURI(response.error));
    }

    return response;
  } catch (error) {
    return redirect(errRedirectURI(`Error: ${error}`));
  }
};
