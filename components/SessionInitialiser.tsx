"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PATHS } from "@/routes.config";
import createOrRefreshSession from "@/lib/actions/createOrRefreshSession";

const SessionInitialiser = () => {
  const pageName = usePathname();
  useEffect(() => {
    if (pageName === PATHS.YOUR_FIT) return;
    (async () => {
      await createOrRefreshSession();
    })();
  }, [pageName]);
  return null;
};
export default SessionInitialiser;
