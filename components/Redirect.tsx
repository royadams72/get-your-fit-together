"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RedirectProps {
  redirectTo: string;
  query: string | undefined;
}
const Redirect = ({ redirectTo, query }: RedirectProps) => {
  const router = useRouter();
  useEffect(() => {
    const replaceString = query
      ? `${redirectTo}?error=${encodeURIComponent(query)}`
      : `${redirectTo}?error=${encodeURIComponent(
          "There has been an error with the website, please try again later"
        )}`;
    router.replace(replaceString);
  }, [redirectTo, query]);

  return null;
};

export default Redirect;
