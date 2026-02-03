import { TW_BREAKPOINTS } from "@/configs";
import { useEffect, useState } from "react";

type Breakpoint = keyof typeof TW_BREAKPOINTS;

export function useBreakpoint(bp: Breakpoint) {
  const query = `(min-width: ${TW_BREAKPOINTS[bp]}px)`;
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const handler = () => setMatches(media.matches);

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
