import type { Metadata } from "next";

import "./_globals.scss";

import RootUIComponent from "@/components/RootUIComponent";

export const metadata: Metadata = {
  title: "Get Your Fit Together",
  description: "Fitness app",
  icons: {
    icon: "/favicon.png",
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <RootUIComponent>{children}</RootUIComponent>
      </body>
    </html>
  );
};
export default RootLayout;
