"use server";
import { cookies } from "next/headers";

import { API } from "@/routes.config";
import { RootState } from "@/types/interfaces/store";
import { v4 as uuidv4 } from "uuid";
import { ENV } from "@/lib/services/envService";
import { fetchHelper } from "@/lib/actions/fetchHelper";
import { UserForm } from "@/types/interfaces/form";
import { isNotEmpty } from "../utils/isEmpty";
import { Cookie } from "@/types/enums/cookie.enum";

const setCookiesAndSaveState = async (
  savedState?: RootState,
  data?: UserForm
) => {
  const isRetrievingPlan = isNotEmpty(data);
  const isOnJourney = isNotEmpty(savedState);
  const cookieStore = await cookies();
  let sessionCookie = cookieStore.get("sessionCookie")?.value || undefined;

  cookieStore.set(Cookie.fromPrevPage, "true");

  if (isRetrievingPlan) {
    cookieStore.set(Cookie.userData, JSON.stringify(data));
  }

  if (!sessionCookie) {
    const id = uuidv4();
    cookieStore.set(Cookie.sessionCookie, id);
    sessionCookie = cookieStore.get("sessionCookie")?.value;
  }

  if (isOnJourney) {
    // console.log(savedState, sessionCookie);

    await fetchHelper(`${ENV.BASE_URL}/${API.SAVE_PLAN}`, {
      savedState,
      sessionCookie,
    });
  }
};

export default setCookiesAndSaveState;
