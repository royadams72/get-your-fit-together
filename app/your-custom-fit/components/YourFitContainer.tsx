export const dynamic = "force-dynamic";
import { State } from "@/types/interfaces/store";
import retrieveAndSetStore from "@/lib/server-functions/retrieveAndSetStore";
import { use } from "react";
import StoreProvider from "@/app/StoreProvider";
import YourFit from "./YourFit";

export default function YourFitContainer() {
  const result = use(retrieveAndSetStore());

  return (
    <StoreProvider preloadedState={result as State}>
      <YourFit />
    </StoreProvider>
  );
}
