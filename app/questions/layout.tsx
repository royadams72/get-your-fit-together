import { Suspense } from "react";
import StoreProvider from "../StoreProvider";
import LayoutWrapper from "./components/LayoutWrapper";
import Loading from "./your-goals/components/loading";

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <StoreProvider>
        <LayoutWrapper>{children}</LayoutWrapper>
      </StoreProvider>
    </Suspense>
  );
}
