import { useEffect, type RefObject } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: Handler,
  enabled: boolean = true,
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    // Sử dụng cả mousedown và touchstart để hỗ trợ tốt trên mobile
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, handler, enabled]);
};
