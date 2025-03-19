import type { Metadata } from "next";
import "./globals.scss";
import StoreProvider from "./StoreProvider";
import { LoaderProvider } from "@/context/Loader/LoaderProvider";

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
          <StoreProvider>{children} </StoreProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
