// import React, { useEffect } from "react";

import { Select } from "@/types/interfaces/form";
import AboutYou from "./components/AboutYou";

const ABoutYou = () => {
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
    <div>
      <AboutYou></AboutYou>
    </div>
  );
};

export default ABoutYou;
