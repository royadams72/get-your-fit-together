import React from "react";
import StoreProvider from "../StoreProvider";

const FeedbackLayout = ({ children }: { children: React.ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default FeedbackLayout;
