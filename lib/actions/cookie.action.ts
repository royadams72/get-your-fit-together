"use server";

import { cookies } from "next/headers";

const cookieAction = async (isDeleting: boolean, names: string[]) => {
  const cookieStore = await cookies();

  names.forEach((name) => {
    if (isDeleting && cookieStore.get(name)?.value) {
      cookieStore.delete(name);
    }
  });
};

export default cookieAction;
