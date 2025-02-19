import React from "react";
import YourGoalsQuestions from "./components/YourGoalsQuestions";
import StoreProvider from "@/app/StoreProvider";

const YouGoals = () => {
  return (
    <StoreProvider>
      <YourGoalsQuestions />
    </StoreProvider>
  );
};

export default YouGoals;
