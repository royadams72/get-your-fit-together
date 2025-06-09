"use server";

import { CookieAction } from "@/types/enums/cookie.enum";
import { cookies } from "next/headers";

const cookieAction = async (
  action: CookieAction,
  names: string[],
  cookieVal?: any[]
): Promise<string | undefined> => {
  const cookieStore = await cookies();
  // console.log("action::::::::::::", action);
  for (let i = 0; i < names.length; i++) {
    const name = names[i];

    if (action === CookieAction.delete && cookieStore.get(name)?.value) {
      cookieStore.delete(name);
    } else if (
      action === CookieAction.set &&
      cookieStore.get(name)?.value &&
      cookieVal !== undefined
    ) {
      cookieStore.set(name, cookieVal[i]);
    } else if (action === CookieAction.get && cookieStore.get(name)?.value) {
      // console.log("action", action, cookieStore.get(name)?.value);

      return cookieStore.get(name)?.value;
    }
  }

  return undefined; // In case nothin
};

export default cookieAction;
