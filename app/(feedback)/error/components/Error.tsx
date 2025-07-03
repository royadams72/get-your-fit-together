"use client";
import Button from "@/components/Button";
import { PATHS } from "@/routes.config";
import { useResetStore } from "@/lib/hooks/useResetStore";

interface ErrorProps {
  error: string;
}
const Error = ({ error }: ErrorProps) => {
  useResetStore();

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
