import { useEffect } from "react";
import { CookieAction, Cookie } from "@/types/enums/cookie.enum";
import { Storage } from "@/types/enums/cookie.enum";
import { useAppDispatch } from "@/lib/hooks/storeHooks";
import { setStore, defaultState } from "@/lib/store/store";
import cookieAction from "@/lib/actions/cookie.action";

export const useResetStore = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setStore(defaultState));
    sessionStorage.removeItem(Storage.reduxStore);
    (async () => {
      await cookieAction(CookieAction.set, [Cookie.sessionCookie]);
    })();
  }, []);
};
