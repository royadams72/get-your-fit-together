import { useEffect } from "react";
import { CookieAction, Cookie } from "@/types/enums/cookie.enum";
import { UiData } from "@/types/enums/uiData.enum";

import { getSessionCookie, setUiData } from "@/lib/features/uiData/uiDataSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/storeHooks";
import cookieAction from "@/lib/actions/cookie.action";

const useSetSessionToStore = () => {
  const isSessionInState = useAppSelector(getSessionCookie);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const sessionCookie = await cookieAction(CookieAction.get, [
          Cookie.sessionCookie,
        ]);
        console.log("sessionCookie in retrieve", sessionCookie);

        if (!isSessionInState) {
          dispatch(
            setUiData({
              name: UiData.sessionCookie,
              value: sessionCookie as string,
            })
          );
        }
      })();
    }, 100);
  }, []);
};
export default useSetSessionToStore;
