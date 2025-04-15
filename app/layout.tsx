import type { Metadata } from "next";
import "./_globals.scss";
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
        <main>
          <LoaderProvider>
            <StoreProvider>{children} </StoreProvider>
          </LoaderProvider>
        </main>
      </body>
    </html>
  );
}
