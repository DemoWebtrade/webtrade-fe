import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef } from "react";

interface UseAgGridAutoScrollProps {
  durationPerCycle?: number;
  pauseBetweenCycles?: number;
  enabled?: boolean;
}

type data = {
  [key: string]: string | number;
};

export const useAgGridAutoScroll = ({
  durationPerCycle = 12000,
  pauseBetweenCycles = 1000,
  enabled = true,
}: UseAgGridAutoScrollProps = {}) => {
  const gridRef = useRef<AgGridReact<data>>(null);
  const isAnimatingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const loopEnabledRef = useRef(enabled);

  // Cập nhật enabled khi prop thay đổi
  useEffect(() => {
    loopEnabledRef.current = enabled;
  }, [enabled]);

  const performScrollCycle = useCallback(() => {
    if (isAnimatingRef.current || !loopEnabledRef.current) return;

    isAnimatingRef.current = true;

    const api = gridRef.current?.api;
    if (!api) {
      isAnimatingRef.current = false;
      return;
    }

    const gridBody = document.querySelector(
      ".ag-body-viewport",
    ) as HTMLElement | null;
    if (!gridBody) {
      isAnimatingRef.current = false;
      return;
    }

    const rowCount = api.getDisplayedRowCount();
    if (rowCount < 2) {
      isAnimatingRef.current = false;
      return;
    }

    const maxScroll = gridBody.scrollHeight - gridBody.clientHeight;
    if (maxScroll <= 50) {
      isAnimatingRef.current = false;
      return;
    }

    const startScrollTop = gridBody.scrollTop;
    const targetScrollTop = Math.max(0, maxScroll);
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationPerCycle, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      gridBody.scrollTop =
        startScrollTop + (targetScrollTop - startScrollTop) * ease;

      if (0 < progress && progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // === Kết thúc cycle ===
        gridBody.scrollTop = 0;

        isAnimatingRef.current = false;

        if (loopEnabledRef.current) {
          setTimeout(() => {
            performScrollCycle();
          }, pauseBetweenCycles);
        }
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, [durationPerCycle, pauseBetweenCycles]);

  const startAutoScroll = useCallback(() => {
    setTimeout(() => {
      performScrollCycle();
    }, 150);
  }, [performScrollCycle]);

  const stopAutoScroll = useCallback(() => {
    loopEnabledRef.current = false;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    isAnimatingRef.current = false;
  }, []);

  const resumeAutoScroll = useCallback(() => {
    loopEnabledRef.current = true;
    performScrollCycle();
  }, [performScrollCycle]);

  // Cleanup khi unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return {
    gridRef,
    startAutoScroll,
    stopAutoScroll,
    resumeAutoScroll,
    performScrollCycle,
  };
};
