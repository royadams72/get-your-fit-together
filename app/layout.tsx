import type { Metadata } from "next";
import "./globals.scss";
import StoreProvider from "./StoreProvider";

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
        <StoreProvider>{children} </StoreProvider>
      </body>
    </html>
  );
}
