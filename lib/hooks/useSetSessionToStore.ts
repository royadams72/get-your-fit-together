import { useEffect } from "react";
import { CookieAction, Cookie } from "@/types/enums/cookie.enum";
import { UiData } from "@/types/enums/uiData.enum";

import { getSessionId, setUiData } from "@/lib/features/uiData/uiDataSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import cookieAction from "@/lib/actions/cookie.action";

import { getRoutes } from "../features/journey/journeySlice";

const useSetSessionToStore = () => {
  const isSessionInState = useAppSelector(getSessionId);
  const dispatch = useAppDispatch();
  const { nextRoute } = useAppSelector(getRoutes);
  useEffect(() => {
    setTimeout(() => {
      (async () => {
        if (!isSessionInState) {
          const sessionCookie = await cookieAction(CookieAction.get, [
            Cookie.sessionCookie,
          ]);
          // console.log("sessionCookie in retrieve", sessionCookie);
          dispatch(
            setUiData({
              name: UiData.sessionId,
              value: sessionCookie as string,
            })
          );
        }
      })();
    }, 100);
  }, [nextRoute]);
};
export default useSetSessionToStore;
