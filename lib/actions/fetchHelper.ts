import { redirect } from "next/navigation";
import { PATHS } from "@/routes.config";
import { isNotEmpty } from "../utils/isEmpty";

const errRedirectURI = (resObjString: any) => {
  return `${PATHS.ERROR}?error=${encodeURIComponent(resObjString)}`;
};

export const fetchHelper = async (
  url: string,
  args: Record<string, unknown> | string
) => {
  try {
    const res: any = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(args),
    });

    const response = await res.json();

    // console.log(
    //   "helper response:",
    //   response,
    //   response.redirect && isNotEmpty(response.error)
    // );
    if (response.redirect && isNotEmpty(response.error)) {
      return redirect(errRedirectURI(response.error));
    }

    return response;
  } catch (error) {
    return redirect(errRedirectURI(`Error saving data: ${error}`));
  }
};
