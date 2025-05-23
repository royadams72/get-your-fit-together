import { useRouter } from "next/navigation";
import { PATHS } from "@/routes.config";
import { isNotEmpty } from "../utils/isEmpty";

export const useClientFetch = () => {
  const router = useRouter();
  const clientFetch = async (
    url: string,
    args: Record<string, unknown> | string
  ) => {
    const params = typeof args === "object" ? { ...args } : args;
    console.log(params);

    const res: any = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const response = await res.json();

    if (response.redirect && isNotEmpty(response.error)) {
      return router.push(
        `${PATHS.ERROR}?error=${encodeURIComponent(
          response.error || response.error.message
        )}`
      );
    }

    return response;
  };

  return clientFetch;
};
