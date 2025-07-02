"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PATHS } from "@/routes.config";
import createOrRefreshSession from "@/lib/actions/createOrRefreshSession";
import { setRedis } from "@/lib/actions/setRedis";

const SessionInitialiser = () => {
  const pageName = usePathname();
  useEffect(() => {
    if (pageName === PATHS.YOUR_FIT) return;
    (async () => {
      const sessionId = await createOrRefreshSession();
      console.log("SessionInitialiser called");

      await setRedis(sessionId);
    })();
  }, [pageName]);
  return null;
};
export default SessionInitialiser;
