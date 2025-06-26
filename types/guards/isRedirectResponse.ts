import { ResponseObj } from "@/types/interfaces/api";

export function isRedirectResponse({ redirect }: { redirect: boolean }) {
  console.log(redirect);

  if (redirect) {
    return { redirect };
  }
}
