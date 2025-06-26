import { ResponseObj } from "@/types/interfaces/response";

export function isRedirectResponse({ redirect }: { redirect: boolean }) {
  console.log(redirect);

  if (redirect) {
    return { redirect };
  }
}
