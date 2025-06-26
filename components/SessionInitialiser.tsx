import { useEffect } from "react";

import { usePathname } from "next/navigation";

import createSessionIfNeeded from "@/lib/actions/createSessionIfNeeded";
import { PATHS } from "@/routes.config";

const SessionInitialiser = () => {
  const pageName = usePathname();
  useEffect(() => {
    if (pageName === PATHS.YOUR_FIT) return;
    (async () => {
      await createSessionIfNeeded();
    })();
  }, [pageName]);
  return null;
};
export default SessionInitialiser;
