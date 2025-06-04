"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks/storeHooks";
import { defaultState, setStore } from "@/lib/store/store";
import Button from "@/components/Button";

interface ErrorProps {
  error: string;
}
const Error = ({ error }: ErrorProps) => {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(setStore(defaultState));
  // }, [dispatch]);

  return (
    <div>
      <h3 style={{ color: "var(--error)", textAlign: "center" }}>{error}</h3>

      <Button href="/" style={{ maxWidth: "300px", margin: "1rem auto 0" }}>
        Home page
      </Button>
    </div>
  );
};

export default Error;
