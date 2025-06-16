"use client";
import { RootState } from "@/types/interfaces/store";
import StoreProvider from "@/app/StoreProvider";
import YourFit from "./YourFit";
import { FitPlan } from "@/types/interfaces/fitness-plan";

const YourFitWrapper = ({ preloadedState }: { preloadedState: RootState }) => {
  return (
    <StoreProvider preloadedState={preloadedState}>
      <YourFit />
    </StoreProvider>
  );
};

export default YourFitWrapper;
