"use client";
import { useRef } from "react";
import { Storage } from "@/types/enums/cookie.enum";
import { RootState } from "@/types/interfaces/store";
import { makeStore } from "@/lib/store/store";
import { Provider } from "react-redux";

function loadStateFromSessionStorage() {
  if (typeof window !== "undefined") {
    const serializedState = sessionStorage.getItem(Storage.reduxStore);
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
  const stateToUse = preloadedState ?? loadStateFromSessionStorage();
  const storeRef = useRef(makeStore(stateToUse));

  return <Provider store={storeRef.current}>{children}</Provider>;
}
