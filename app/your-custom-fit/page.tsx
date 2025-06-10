import { Suspense } from "react";
import Loader from "@/context/Loader/Loader";
import retrieveAndSetStore from "@/lib/actions/retrieveAndSetStore";
import YourFitWrapper from "./components/YourFitWrapper";

export default async function YourCustomFitPage() {
  const preloadedState = await retrieveAndSetStore();

  return (
    <Suspense fallback={<Loader />}>
      <YourFitWrapper preloadedState={preloadedState || {}}></YourFitWrapper>
    </Suspense>
  );
}
