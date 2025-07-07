import StoreProvider from "../StoreProvider";
import LayoutWrapper from "./components/LayoutWrapper";

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <LayoutWrapper>{children}</LayoutWrapper>
    </StoreProvider>
  );
}
