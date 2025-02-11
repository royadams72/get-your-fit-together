// import React, { useEffect } from "react";

import AboutYouQuestions from "./components/AboutYouQuestions";
import StoreProvider from "@/app/StoreProvider";

const ABoutYou = async () => {
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("http://localhost:3000/api/get-plan/", {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     return data;
  //   })();
  // }, []);

  return (
    <StoreProvider>
      <div>
        <AboutYouQuestions></AboutYouQuestions>
      </div>
    </StoreProvider>
  );
};

export default ABoutYou;
