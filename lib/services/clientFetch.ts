import { useRouter } from "next/navigation";
import { PATHS } from "@/routes.config";
import { isNotEmpty } from "../utils/isEmpty";

export const useClientFetch = () => {
  const router = useRouter();

  const clientFetch = async (url: any, ...args: any) => {
    const res: any = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(args),
    });
    console.log(res);

    const response = await res.json();

    if (response.ignore && isNotEmpty(response.error)) {
      console.log(`${PATHS.ERROR}?error=${encodeURIComponent(response.error)}`);
      return router.push(
        `${PATHS.ERROR}?error=${encodeURIComponent(response.error)}`
      );
    }

    return response;
  };

  return clientFetch;
};
