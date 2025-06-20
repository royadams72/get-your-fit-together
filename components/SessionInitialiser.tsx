import { useEffect } from "react";
import cookieAction from "@/lib/actions/cookie.action";
import { CookieAction, Cookie } from "@/types/enums/cookie.enum";
import { usePathname } from "next/navigation";

import { v4 as uuidv4 } from "uuid";
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
