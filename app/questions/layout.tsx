import { Suspense } from "react";
import StoreProvider from "../StoreProvider";
import LayoutWrapper from "./components/LayoutWrapper";
import Loader from "@/context/Loader/Loader";
import bcrypt from "bcryptjs";

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const myPassword = "myPassword";
  // const salt = bcrypt.genSaltSync(10);
  // const hashedPassword = bcrypt.hashSync(myPassword as string, salt);
  // console.log("hashedPassword", hashedPassword);
  return (
    <Suspense fallback={<Loader isGeneric={true} />}>
      <StoreProvider>
        <LayoutWrapper>{children}</LayoutWrapper>
      </StoreProvider>
    </Suspense>
  );
}
