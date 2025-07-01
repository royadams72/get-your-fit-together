import { isNotEmpty } from "@/lib/utils/isEmpty";

export const fetchHelper = async <T = Record<string, unknown>>(
  url: string,
  args?: T | string,
  method = "POST",
  cookieString?: string
) => {
  const options: RequestInit = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(cookieString ? { Cookie: cookieString } : {}),
    },
  };

  if (isNotEmpty(args) && method !== "GET" && method !== "HEAD") {
    options.body = JSON.stringify(args);
  }
  try {
    const res: any = await fetch(url, options);

    const response = await res.json();

    if (response.redirect && isNotEmpty(response.error)) {
      return {
        redirect: { error: response.error || "Unknown error" },
      };
    }

    return response;
  } catch (error) {
    return {
      redirect: { error: `Error: ${error}` },
    };
  }
};
