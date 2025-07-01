"use client";
import React, { useEffect } from "react";
import { Cookie } from "@/types/enums/cookie.enum";

import { useAppDispatch } from "@/lib/hooks/storeHooks";
import { defaultState, setStore } from "@/lib/store/store";
import Button from "@/components/Button";
import { PATHS } from "@/routes.config";

interface ErrorProps {
  error: string;
}
const Error = ({ error }: ErrorProps) => {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(setStore(defaultState));
  //   sessionStorage.removeItem("redux-store");
  //   sessionStorage.removeItem("sessionId");
  //   document.cookie = `${Cookie.sessionCookie}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  // }, [dispatch]);

  return (
    <div>
      <h3 style={{ color: "var(--error)", textAlign: "center" }}>{error}</h3>

      <Button href="/" style={{ maxWidth: "300px", margin: "1rem auto 0" }}>
        Home page
      </Button>
      <Button
        href={PATHS.RETRIEVE_PLAN}
        style={{ maxWidth: "300px", margin: "1rem auto 0" }}
        inverted
      >
        Retrieve Plan
      </Button>
    </div>
  );
};

export default Error;
