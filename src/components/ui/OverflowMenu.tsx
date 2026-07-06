import i18n from "@/lib/i18n";
import type { MenuItem } from "@/types/priceBoard";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState, type FC } from "react";
import { ShiftingDropDown } from "./ShiftingDropDown";

interface OverflowMenuProps {
  items: MenuItem[];
  activeId: string;
  handleChangeId: (id: string) => void;
}

export const OverflowMenu: FC<OverflowMenuProps> = ({
  items,
  activeId,
  handleChangeId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const moreRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(items.length);
  const [showMore, setShowMore] = useState(false);
  const GAP = 8;

  useEffect(() => {
    const calc = () => {
      const container = containerRef.current;
      if (!container) return;
      const containerWidth = container.offsetWidth;
      const moreWidth = moreRef.current?.offsetWidth ?? 40;

      let total = 0;
      let count = items.length;

      for (let i = 0; i < items.length; i++) {
        const itemWidth = itemRefs.current[i]?.offsetWidth ?? 0;
        const gapBefore = i === 0 ? 0 : GAP;
        const isLast = i === items.length - 1;
        const reserveForMore = isLast ? 0 : moreWidth + GAP;

        total += gapBefore + itemWidth;

        if (total + reserveForMore > containerWidth) {
          count = i;
          break;
        }
      }

      setVisibleCount(count);
    };

    calc();
    const ro = new ResizeObserver(calc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [items]);

  const visibleItems = items.slice(0, visibleCount);
  const hiddenItems = items.slice(visibleCount);
  const activeInHidden = hiddenItems.some(
    (t) => t.id === activeId || t.children?.some((c) => c.id === activeId),
  );

  return (
    <div
      ref={containerRef}
      className="relative flex flex-nowrap gap-2 w-full min-w-0"
    >
      {/* bản đo ẩn */}
      <div
        className="absolute top-0 left-0 w-0 h-0 overflow-hidden opacity-0 pointer-events-none -z-10 flex gap-2"
        aria-hidden
      >
        {items.map((t, i) => (
          <div
            key={t.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
          >
            <ShiftingDropDown
              t={t}
              id={activeId}
              handleChangeId={handleChangeId}
            />
          </div>
        ))}
      </div>

      {/* Vùng list hiển thị*/}
      <div className="flex flex-nowrap gap-2 min-w-0 flex-1">
        {visibleItems.map((t) => (
          <ShiftingDropDown
            key={t.id}
            t={t}
            id={activeId}
            handleChangeId={handleChangeId}
          />
        ))}
      </div>

      {hiddenItems.length > 0 && (
        <div
          ref={moreRef}
          className="relative shrink-0"
          onMouseLeave={() => setShowMore(false)}
        >
          <button
            title="shift-tab-more"
            onMouseEnter={() => setShowMore(true)}
            onClick={() => setShowMore((s) => !s)}
            className={`flex items-center justify-center gap-1 rounded-md px-2 py-1.5 text-sm transition-colors ${
              activeInHidden
                ? "bg-purple-active text-white"
                : "text-content-primary"
            }`}
          >
            <MoreHorizontal className="size-4" />
          </button>

          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 top-[calc(100%+14px)] w-44 rounded-lg border border-neutral-600 bg-bg-secondary p-2 flex flex-col gap-1 z-50"
              >
                <Bridge />
                {hiddenItems.map((t) => (
                  <HiddenMenuItem
                    key={t.id}
                    t={t}
                    activeId={activeId}
                    handleChangeId={handleChangeId}
                    closeParent={() => setShowMore(false)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

interface HiddenMenuItemProps {
  t: MenuItem;
  activeId: string;
  handleChangeId: (id: string) => void;
  closeParent: () => void;
}

const HiddenMenuItem: FC<HiddenMenuItemProps> = ({
  t,
  activeId,
  handleChangeId,
  closeParent,
}) => {
  const [showSub, setShowSub] = useState(false);
  const isActive =
    t.id === activeId || t.children?.some((c) => c.id === activeId);

  if (!t.children) {
    return (
      <div
        onClick={() => {
          handleChangeId(t.id);
          closeParent();
        }}
        className={`rounded-md p-1.5 text-sm cursor-pointer hover:bg-purple-hover hover:text-white ${
          isActive ? "bg-purple-active text-white" : "text-content-primary"
        }`}
      >
        {i18n.t(t.title)}
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowSub(true)}
      onMouseLeave={() => setShowSub(false)}
    >
      <div
        className={`flex items-center justify-between rounded-md p-1.5 text-sm cursor-pointer hover:bg-purple-hover hover:text-white ${
          isActive ? "bg-purple-active text-white" : "text-content-primary"
        }`}
      >
        <span>
          {t?.children?.some((c) => c.id === activeId)
            ? i18n.t(t.children.find((c) => c.id === activeId)?.title ?? "")
            : i18n.t(t.title)}
        </span>
        <ChevronRight size={14} />
      </div>

      <AnimatePresence>
        {showSub && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            className="absolute top-[calc(100%+6px)] md:top-0 md:left-[calc(100%+12px)]  w-40 rounded-lg border border-neutral-600 bg-bg-secondary p-2 flex flex-col gap-1 z-50"
          >
            <SideBridge />
            {t.children.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  handleChangeId(c.id);
                  closeParent();
                }}
                className={`rounded-md p-1.5 text-sm cursor-pointer hover:bg-purple-hover hover:text-white ${
                  activeId === c.id
                    ? "bg-purple-active text-white"
                    : "text-content-primary"
                }`}
              >
                {i18n.t(c.title)}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Bridge = () => <div className="absolute -top-3.5 left-0 right-0 h-8" />;
const SideBridge = () => (
  <div className="absolute -left-2.5 top-0 bottom-0 w-4" />
);
