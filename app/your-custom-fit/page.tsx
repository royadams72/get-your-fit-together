export const dynamic = "force-dynamic";

import retrieveAndSetStore from "@/lib/server-functions/retrieveAndSetStore";
import { State } from "@/types/interfaces/store";
import StoreProvider from "../StoreProvider";
import YourFit from "./components/YourFit";

export default async function YourCustomFitPage() {
  const result = await retrieveAndSetStore();

  return (
    <StoreProvider preloadedState={result as State}>
      <YourFit />
    </StoreProvider>
  );
}
