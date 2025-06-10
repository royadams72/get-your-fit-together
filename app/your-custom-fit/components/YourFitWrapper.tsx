"use client";
import YourFit from "./YourFit";
import { RootState } from "@/types/interfaces/store";
import StoreProvider from "@/app/StoreProvider";

const YourFitWrapper = ({ preloadedState }: { preloadedState: RootState }) => {
  console.log("YourFitWrapper loaded::");

  return (
    <StoreProvider preloadedState={preloadedState}>
      <YourFit />
    </StoreProvider>
  );
};

export default YourFitWrapper;
