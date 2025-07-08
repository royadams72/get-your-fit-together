"use client";
import { useEffect } from "react";
import { PATHS } from "@/routes.config";

import { useRedirectOnError } from "@/lib/hooks/useRedirectOnError";

import createOrRefreshSession from "@/lib/actions/createOrRefreshSession";
import { setRedis } from "@/lib/actions/setRedis";
import { verifySession } from "@/lib/actions/verifySession";

const SessionInitialiser = ({ pageName }: { pageName: string }) => {
  const handleClientErrorRedirect = useRedirectOnError();
  useEffect(() => {
    if (pageName === PATHS.YOUR_FIT) return;

    (async () => {
      try {
        const shouldSetCookie =
          pageName === "/" ||
          pageName === PATHS.ABOUT_YOU ||
          pageName === PATHS.RETRIEVE_PLAN
            ? true
            : false;
        const sessionId = await createOrRefreshSession(shouldSetCookie);

        if (sessionId) {
          await setRedis(sessionId);
        }
        const verifyResponse = await verifySession();

        if (verifyResponse && "redirect" in verifyResponse) {
          handleClientErrorRedirect(verifyResponse);
        }
      } catch (error) {
        handleClientErrorRedirect({ message: error as string, redirect: true });
      }
    })();
  }, [pageName]);
  return null;
};
export default SessionInitialiser;
