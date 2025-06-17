"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store/store";
import { RootState } from "@/types/interfaces/store";
import { Cookie } from "@/types/enums/cookie.enum";

function loadStateFromSessionStorage() {
  if (typeof window !== "undefined") {
    const serializedState = sessionStorage.getItem("redux-store");
    if (serializedState) {
      return JSON.parse(serializedState);
    }
  }
  return undefined;
}

export default function StoreProvider({
  children,
  preloadedState,
}: {
  children: React.ReactNode;
  preloadedState?: RootState;
}) {
  useEffect(() => {
    const handleUnload = () => {
      document.cookie = `${Cookie.sessionCookie}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    };

    window.addEventListener("unload", handleUnload);
    return () => window.removeEventListener("unload", handleUnload);
  }, []);

  const stateToUse = preloadedState ?? loadStateFromSessionStorage();
  const storeRef = useRef(makeStore(stateToUse));

  return <Provider store={storeRef.current}>{children}</Provider>;
}
