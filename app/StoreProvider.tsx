"use client";
import { useEffect, useRef } from "react";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { AppStore, RootState } from "@/types/interfaces/store";

import { makeStore } from "@/lib/store/store";
import { Cookie } from "@/types/enums/cookie.enum";
import Loader from "@/context/Loader/Loader";

interface Props {
  children: React.ReactNode;
  preloadedState?: RootState;
}
export default function StoreProvider({ children, preloadedState }: Props) {
  const storeRef = useRef<AppStore>(null);
  const persistorRef = useRef<any>(null);
  console.log("StoreProvider loaded");

  useEffect(() => {
    const handleUnload = () => {
      document.cookie = `${Cookie.sessionCookie}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    };

    window.addEventListener("unload", handleUnload);
    return () => window.removeEventListener("unload", handleUnload);
  }, []);

  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState);

    persistorRef.current = persistStore(storeRef.current);
    console.log("persistorRef.current in StoreProvider:", persistorRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={<Loader />} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
