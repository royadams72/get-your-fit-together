"use server";

import { CookieAction } from "@/types/enums/cookie.enum";
import { cookies } from "next/headers";

const cookieAction = async (
  action: CookieAction,
  names: string[],
  cookieVal?: any[]
): Promise<string | undefined> => {
  const cookieStore = await cookies();

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const cookieValue = cookieVal !== undefined && cookieVal[i];

    if (action === CookieAction.delete && cookieStore.get(name)?.value) {
      cookieStore.delete(name);
    } else if (action === CookieAction.set && cookieVal !== undefined) {
      cookieStore.set(name, cookieValue, { maxAge: 800, httpOnly: true });
    } else if (action === CookieAction.get && cookieStore.get(name)?.value) {
      return cookieStore.get(name)?.value;
    }
  }

  return undefined; // In case nothing
};

export default cookieAction;
