"use client";
import React, { useEffect } from "react";
import { PATHS } from "@/routes.config";

import { useAppDispatch } from "@/lib/hooks/storeHooks";
import { defaultState, setStore } from "@/lib/store/store";

import Button from "@/components/Button";
import cookieAction from "@/lib/actions/cookie.action";
import { Cookie, CookieAction } from "@/types/enums/cookie.enum";

interface SuccessProps {
  message: string;
  mode?: string;
}
enum Mode {
  plan = "plan",
}
const Success = ({ message, mode }: SuccessProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setStore(defaultState));

    // (async () => {
    //   await cookieAction(CookieAction.delete, [
    //     Cookie.fromPrevPage,
    //     Cookie.sessionCookie,
    //     Cookie.userData,
    //   ]);
    // })();
  }, [dispatch]);

  return (
    <div>
      <h3 style={{ color: "var(--success)", textAlign: "center" }}>
        {message}
      </h3>
      {mode === Mode.plan && (
        <Button
          href={PATHS.RETRIEVE_PLAN}
          style={{ maxWidth: "300px", margin: "1rem auto 0" }}
        >
          You can retrieve your plan here
        </Button>
      )}
    </div>
  );
};

export default Success;
