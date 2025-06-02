import { useRouter } from "next/navigation";
import { PATHS } from "@/routes.config";
import { isNotEmpty } from "../utils/isEmpty";

const errRedirectURI = (resObjString: any) => {
  return `${PATHS.ERROR}?error=${encodeURIComponent(resObjString)}`;
};

export const useClientFetch = () => {
  const router = useRouter();

  const clientFetch = async (
    url: string,
    args: Record<string, unknown> | string
  ) => {
    const params = typeof args === "object" ? { ...args } : args;

    try {
      const res: any = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      const response = await res.json();

      if (response.redirect && isNotEmpty(response.error)) {
        return router.push(
          errRedirectURI(response.error || response.error.message)
        );
      }
      return response;
    } catch (error) {
      return router.push(errRedirectURI(`Error saving data: ${error}`));
    }
  };

  return clientFetch;
};
