import React from "react";
import Button from "../../../components/Button";
import { PATHS } from "@/routes.config";

interface SuccessProps {
  message: string;
  mode: string;
}
enum Mode {
  plan = "plan",
}
const Success = ({ message, mode }: SuccessProps) => {
  return (
    <div>
      <h3 style={{ color: "var(--success)" }}>{message}</h3>
      {mode === Mode.plan && (
        <Button href={PATHS.RETRIEVE_PLAN} style={{ marginTop: "1rem" }}>
          You can retrieve your plan here
        </Button>
      )}
    </div>
  );
};

export default Success;
