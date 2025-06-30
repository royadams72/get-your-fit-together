"use server";

import { ENV } from "@/lib/services/env.service";

export const getCopy = async (url: string) => {
  try {
    const res = await fetch(`${ENV.BASE_URL}/copy/${url}.json`);
    const copy = await res.json();
    return copy;
  } catch (error) {
    console.error(error);
  }
};
