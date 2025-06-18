"use client";
import React from "react";
import RetrievePlan from "./RetrievePlan";
import StoreProvider from "@/app/StoreProvider";

const RetrievePlanWrapper = () => {
  return (
    <StoreProvider>
      <RetrievePlan />
    </StoreProvider>
  );
};

export default RetrievePlanWrapper;
