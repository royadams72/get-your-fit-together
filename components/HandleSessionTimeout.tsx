import Button from "./Button";
import { useRouter } from "next/navigation";
import { SESSION_TTL_MS } from "@/lib/constants/session";
import { useState, useCallback, useEffect } from "react";
import { getLastActivity } from "@/lib/actions/getLastActivity";
import Modal from "./Modal";
import { JOURNEY_PATHS } from "@/routes.config";
import createOrRefreshSession from "@/lib/actions/createOrRefreshSession";

export default function HandleSessionTimeout({
  pageName,
}: {
  pageName: string;
}) {
  const router = useRouter();
  const [remaining, setRemaining] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(false);

  const handleSetShowModal = (isVisible: boolean) => {
    setShowModal(isVisible);
  };

  // Polls session TTL and sets remaining
  const pollSession = useCallback(async () => {
    if (!JOURNEY_PATHS.includes(pageName)) return;

    const last = await getLastActivity();
    if (last) {
      const elapsed = Date.now() - last;
      const left = Math.max(SESSION_TTL_MS - elapsed, 0);
      setRemaining(left);

      if (left <= 60_000 && !showModal) {
        setShowModal(true);
      }

      return left / 3;
    }
  }, [showModal, pageName]);

  const resetSession = () => {
    (async () => {
      await createOrRefreshSession(false);

      pollSession();
      handleSetShowModal(false);
    })();
  };
  // Initial polling and scheduling
  useEffect(() => {
    if (!JOURNEY_PATHS.includes(pageName)) return;
    let timeoutId: NodeJS.Timeout;
    const schedule = async () => {
      const next = await pollSession();
      if (next === undefined || next <= 0) {
        setSessionTimeout(true);
      } else {
        timeoutId = setTimeout(schedule, next);
      }
    };

    schedule();
    return () => clearTimeout(timeoutId);
  }, [pollSession, pageName]);

  // Live countdown once modal is showing
  useEffect(() => {
    if (!showModal) return;
    const tick = setInterval(() => {
      setRemaining((rem) => {
        if (rem === null) return rem;
        const next = rem - 1000;
        if (next <= 0) {
          clearInterval(tick);
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [showModal, pageName]);

  useEffect(() => {
    if (sessionTimeout) {
      setShowModal(false);
      router.push("/error");
      setSessionTimeout(false);
    }
  }, [sessionTimeout, router]);

  if (!showModal || remaining === null) return null;

  const seconds = Math.ceil(remaining / 1000);
  return (
    <Modal open={showModal}>
      <div>
        <h2>Session expiring!</h2>
        <h2>Are you still there?</h2>
        <p style={{ color: "black" }}>
          Redirecting in {seconds} second{seconds !== 1 ? "s" : ""}…
        </p>
        <Button onClick={resetSession}>Yes!</Button>
      </div>
    </Modal>
  );
}
