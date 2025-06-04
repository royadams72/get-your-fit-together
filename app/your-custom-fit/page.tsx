import { Suspense } from "react";
import Loader from "@/context/Loader/Loader";
import YourFitWrapper from "./components/YourFitWrapper";

export default function YourCustomFitPage() {
  return (
    <Suspense fallback={<Loader />}>
      <YourFitWrapper />
    </Suspense>
  );
}
