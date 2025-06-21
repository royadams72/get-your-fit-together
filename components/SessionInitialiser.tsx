import { useEffect } from "react";

import { usePathname } from "next/navigation";

import checkForSession from "@/lib/actions/ckeckForSession";
import { PATHS } from "@/routes.config";

const SessionInitialiser = () => {
  const pageName = usePathname();
  useEffect(() => {
    if (pageName === PATHS.YOUR_FIT) return;
    (async () => {
      await checkForSession();
      console.log("SessionInitialiser");
    })();
  }, [pageName]);
  return null;
};
export default SessionInitialiser;
