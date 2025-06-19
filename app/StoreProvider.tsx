"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store/store";
import { RootState } from "@/types/interfaces/store";

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
  const stateToUse = preloadedState ?? loadStateFromSessionStorage();
  const storeRef = useRef(makeStore(stateToUse));

  return <Provider store={storeRef.current}>{children}</Provider>;
}
