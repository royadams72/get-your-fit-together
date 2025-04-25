import type { Metadata } from "next";
import "./_globals.scss";
import StoreProvider from "./StoreProvider";
import { LoaderProvider } from "@/context/Loader/LoaderProvider";
import RootUIComponent from "@/components/RootUIComponent";

export const metadata: Metadata = {
  title: "Get Your Fit Together",
  description: "Fitness app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LoaderProvider>
          <StoreProvider>
            <RootUIComponent>{children}</RootUIComponent>
          </StoreProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
