import { useEffect } from "react";
import { CookieAction, Cookie } from "@/types/enums/cookie.enum";
import { UiData } from "@/types/enums/uiData.enum";

import { getSessionCookie, setUiData } from "@/lib/features/uiData/uiDataSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import cookieAction from "@/lib/actions/cookie.action";
import { usePathname } from "next/navigation";
import { getRoutes } from "../features/journey/journeySlice";

const useSetSessionToStore = () => {
  const isSessionInState = useAppSelector(getSessionCookie);
  const dispatch = useAppDispatch();
  const { nextRoute } = useAppSelector(getRoutes);
  useEffect(() => {
    setTimeout(() => {
      (async () => {
        console.log("retrieve called");
        if (!isSessionInState) {
          const sessionCookie = await cookieAction(CookieAction.get, [
            Cookie.sessionCookie,
          ]);
          console.log("sessionCookie in retrieve", sessionCookie);
          dispatch(
            setUiData({
              name: UiData.sessionCookie,
              value: sessionCookie as string,
            })
          );
        }
      })();
    }, 100);
  }, [nextRoute]);
};
export default useSetSessionToStore;
