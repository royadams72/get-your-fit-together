import { useEffect } from "react";
import { CookieAction, Cookie } from "@/types/enums/cookie.enum";
import { useAppDispatch } from "@/lib/hooks/storeHooks";
import cookieAction from "@/lib/actions/cookie.action";
import { setStore, defaultState } from "@/lib/store/store";

export const useResetStore = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setStore(defaultState));
    sessionStorage.removeItem("redux-store");
    (async () => {
      setTimeout(() => {
        cookieAction(CookieAction.delete, [Cookie.sessionCookie]);
      }, 4000);
    })();
  }, []);
};
