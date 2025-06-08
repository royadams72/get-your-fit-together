"use client";
import { useEffect, useRef } from "react";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { AppStore } from "@/types/interfaces/store";

import { makeStore } from "@/lib/store/store";
import { Cookie } from "@/types/enums/cookie.enum";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);
  const persistorRef = useRef<any>(null);
  useEffect(() => {
    const handleUnload = () => {
      document.cookie = `${Cookie.sessionCookie}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    };

    window.addEventListener("unload", handleUnload);
    return () => window.removeEventListener("unload", handleUnload);
  }, []);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
