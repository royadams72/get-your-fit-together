"use client";
import React, { useEffect } from "react";

const ABoutYou = () => {
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/api/get-plan/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      return data;
    })();
  }, []);
  return <div>ABoutYou</div>;
};

export default ABoutYou;
