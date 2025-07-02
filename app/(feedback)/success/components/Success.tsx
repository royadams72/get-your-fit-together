"use client";
import { PATHS } from "@/routes.config";
import { useResetStore } from "@/lib/hooks/useResetStore";
import Button from "@/components/Button";

interface SuccessProps {
  message: string;
  mode?: string;
}
enum Mode {
  plan = "plan",
}
const Success = ({ message, mode }: SuccessProps) => {
  useResetStore();
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
