import type { Metadata } from "next";
import { headers } from "next/headers";

import "./_globals.scss";
import StoreProvider from "./StoreProvider";
// import { LoaderProvider } from "@/context/Loader/LoaderProvider";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";
import RootUIComponent from "@/components/RootUIComponent";
import { PATHS } from "@/routes.config";
import retrieveAndSetStore from "@/lib/actions/retrieveAndSetStore";
import cookieAction from "@/lib/actions/cookie.action";

export const metadata: Metadata = {
  title: "Get Your Fit Together",
  description: "Fitness app",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // const hdrs = await headers();
  // const currentPath = hdrs.get("x-current-path");
  // let preloadedState: any;
  // if (currentPath === PATHS.YOUR_FIT) {
  //   preloadedState = await retrieveAndSetStore();
  //   console.log(preloadedState);
  // }
  const sessionCookie = await cookieAction(CookieAction.get, [
    Cookie.sessionCookie,
  ]);
  // console.log("Root layout currentPath", currentPath);
  const preloadedState = sessionCookie
    ? await retrieveAndSetStore()
    : undefined;
  return (
    <html lang="en">
      <body>
        {/* <LoaderProvider> */}
        <StoreProvider preloadedState={preloadedState}>
          <RootUIComponent>{children}</RootUIComponent>
        </StoreProvider>
        {/* </LoaderProvider> */}
      </body>
    </html>
  );
};
export default RootLayout;
