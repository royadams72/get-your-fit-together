"use server";
import { cookies } from "next/headers";

import { API } from "@/routes.config";
import { RootState } from "@/types/interfaces/store";
import { v4 as uuidv4 } from "uuid";
import { ENV } from "@/lib/services/envService";
import { fetchHelper } from "@/lib/actions/fetchHelper";

const setCookiesAndSaveStateForYourFit = async (savedState: RootState) => {
  const cookieStore = await cookies();
  cookieStore.set("fromPrevPage", "true");

  let sessionCookie = cookieStore.get("sessionCookie")?.value || undefined;
  if (!sessionCookie) {
    const id = uuidv4();
    cookieStore.set("sessionCookie", id);
    sessionCookie = cookieStore.get("sessionCookie")?.value;
  }

  const res = await fetchHelper(`${ENV.BASE_URL}/${API.SAVE_PLAN}`, {
    savedState,
    sessionCookie,
  });

  console.log("res: ", res);
};

export default setCookiesAndSaveStateForYourFit;
