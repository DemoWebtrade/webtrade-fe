import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef } from "react";

interface UseAgGridAutoScrollProps {
  durationPerCycle?: number;
  pauseBetweenCycles?: number;
  enabled?: boolean;
}

export const useAgGridAutoScroll = ({
  durationPerCycle = 12000,
  pauseBetweenCycles = 1000,
  enabled = true,
}: UseAgGridAutoScrollProps = {}) => {
  const gridRef = useRef<AgGridReact<any>>(null);
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

    const currentScroll = gridBody.scrollTop;
    const maxScroll = gridBody.scrollHeight - gridBody.clientHeight;

    // Nếu gần cuối thì nhảy về đầu (tạo hiệu ứng loop)
    const targetScrollTop = currentScroll >= maxScroll - 50 ? 0 : maxScroll;

    const startScrollTop = currentScroll;
    const distance = targetScrollTop - startScrollTop;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationPerCycle, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      gridBody.scrollTop = startScrollTop + distance * ease;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        isAnimatingRef.current = false;
        rafRef.current = null;

        // Tiếp tục cycle sau khi pause
        if (loopEnabledRef.current) {
          setTimeout(() => {
            performScrollCycle();
          }, pauseBetweenCycles);
        }
      }
    };

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
