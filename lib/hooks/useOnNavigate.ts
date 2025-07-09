"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

let clickTime = 0;
let pathWhenClicked = "";

export type PostMessage = {
  fetchUrl: string;
  dest: string;
};

export function useOnNavigate() {
  const curPath = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    clickTime = 0;
    if (curPath !== pathWhenClicked) {
      setLoading(false);
    }
  }, [curPath]);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.serviceWorker) return;

    const onMessage = (event: MessageEvent) => {
      const data = event.data as PostMessage;
      if (Date.now() - clickTime > 1000) return;

      const url = toURL(data.fetchUrl);
      if (url?.search.startsWith("?_rsc=") && data.dest === "") {
        clickTime = 0;
        setLoading(true);
      }
    };

    navigator.serviceWorker.addEventListener("message", onMessage);

    const onClick = (e: MouseEvent) => {
      clickTime = Date.now();
      pathWhenClicked = location.pathname;
    };
    addEventListener("click", onClick, true);

    return () => {
      navigator.serviceWorker.removeEventListener("message", onMessage);
      removeEventListener("click", onClick, true);
    };
  }, []);

  return loading;
}

function toURL(url: string) {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}
