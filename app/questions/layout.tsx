import { Suspense } from "react";
import StoreProvider from "../StoreProvider";
import LayoutWrapper from "./components/LayoutWrapper";
import Loader from "@/context/Loader/Loader";

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loader isGeneric={true} />}>
      <StoreProvider>
        <LayoutWrapper>{children}</LayoutWrapper>
      </StoreProvider>
    </Suspense>
  );
}
