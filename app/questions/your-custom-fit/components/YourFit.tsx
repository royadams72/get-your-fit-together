"use client";

import { useEffect, useState } from "react";

const YourFit = () => {
  const [yourData, setYourData] = useState(null);
  useEffect(() => {
    (async () => {
      const sessionData = sessionStorage.getItem("persist:root");
      const response = await fetch("http://localhost:3000/api/get-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionData }),
      });

      const data = await response.json();
      console.log(data.message.content);

      setYourData(data.message.content);

      // return await response.json();
    })();
  }, []);
  return <div>{yourData && yourData}</div>;
};

export default YourFit;
