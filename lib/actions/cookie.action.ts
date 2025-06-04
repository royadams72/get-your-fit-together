"use server";

import { cookies } from "next/headers";

const cookieAction = async (isDeleting: boolean, name: string) => {
  const cookieStore = await cookies();
  if (isDeleting && cookieStore.get(name)?.value) {
    cookieStore.delete(name);
    console.log("cookie deleted::", cookieStore.get(name));
  }
};

export default cookieAction;
