"use server";
import { cookies } from "next/headers";

import { API } from "@/routes.config";
import { RootState } from "@/types/interfaces/store";
import { v4 as uuidv4 } from "uuid";
import { ENV } from "@/lib/services/envService";
import { fetchHelper } from "@/lib/actions/fetchHelper";
import { UserForm } from "@/types/interfaces/form";
import { isNotEmpty } from "../utils/isEmpty";

const setCookiesAndSaveStateForYourFit = async (
  savedState?: RootState,
  data?: UserForm
) => {
  const isRetrievingPlan = isNotEmpty(data);
  const isSavingStateToCallAI = isNotEmpty(savedState);
  const cookieStore = await cookies();
  let sessionCookie = cookieStore.get("sessionCookie")?.value || undefined;
  cookieStore.set("fromPrevPage", "true");

  if (isRetrievingPlan) {
    cookieStore.set("userData", JSON.stringify(data));
  }

  if (!sessionCookie && isSavingStateToCallAI) {
    const id = uuidv4();
    cookieStore.set("sessionCookie", id);
    sessionCookie = cookieStore.get("sessionCookie")?.value;
  }

  if (isSavingStateToCallAI) {
    await fetchHelper(`${ENV.BASE_URL}/${API.SAVE_PLAN}`, {
      savedState,
      sessionCookie,
    });
  }
};

export default setCookiesAndSaveStateForYourFit;
