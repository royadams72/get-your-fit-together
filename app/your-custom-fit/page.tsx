export const dynamic = "force-dynamic";

import { Suspense } from "react";
import YourFitContainer from "./components/YourFitContainer";
import Loader from "@/context/Loader/Loader";

export default async function YourCustomFitPage() {
  return (
    <Suspense fallback={<Loader />}>
      <YourFitContainer></YourFitContainer>
    </Suspense>
  );
}
