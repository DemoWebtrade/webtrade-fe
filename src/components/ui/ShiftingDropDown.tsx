import type { MenuItem } from "@/types/priceBoard";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, type FC } from "react";

export const ShiftingDropDown = ({
  t,
  id,
  handleChangeId,
}: {
  t: MenuItem;
  id: string;
  handleChangeId: (id: string) => void;
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSetSelected = (val: string | null) => {
    setSelected(val);
  };

  const active = t?.children?.some((i) => i?.id === id) || id === t.id;
  const checkOnclick = t?.children ? false : true;

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex h-fit gap-2"
    >
      <Tab
        key={t.id}
        selected={selected}
        handleSetSelected={handleSetSelected}
        tab={t.id}
        handleChangeId={handleChangeId}
        active={active}
        checkOnclick={checkOnclick}
      >
        <span className="flex flex-row md:gap-1 gap-0.5 items-center justify-center">
          {t?.children?.some((i) => i?.id === id)
            ? t?.children?.find((i) => i?.id === id)?.title
            : t.title}
          {t?.children && (
            <ChevronDown
              className={`size-4 ${selected === t.id && "rotate-180"}`}
            />
          )}
        </span>
      </Tab>
      <AnimatePresence>
        {selected && t?.children && (
          <Content
            children={t?.children}
            idMenu={id}
            handleChangeId={handleChangeId}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

interface TabProps {
  children: React.ReactNode;
  tab: string;
  handleSetSelected: (val: string | null) => void;
  selected: string | null;
  handleChangeId: (id: string) => void;
  active: boolean;
  checkOnclick: boolean;
}

const Tab: FC<TabProps> = ({
  children,
  tab,
  handleSetSelected,
  selected,
  handleChangeId,
  active,
  checkOnclick,
}) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => {
        handleSetSelected(tab);
        if (checkOnclick) handleChangeId(tab);
      }}
      className={`flex items-center justify-center gap-1 rounded-full px-1 md:px-3 md:py-1.5 py-0.5 text-sm transition-colors ${
        selected === tab
          ? "bg-red-hover text-content-primary"
          : "text-content-primary"
      }  ${active ? "bg-red-active text-white" : ""}`}
    >
      <span>{children}</span>
    </button>
  );
};

interface ContentProps {
  children?: {
    id: string;
    title: string;
  }[];
  idMenu: string;
  handleChangeId: (id: string) => void;
}

const Content: FC<ContentProps> = ({ children, idMenu, handleChangeId }) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className="absolute left-0 top-[calc(100%+14px)] w-40 rounded-lg border border-neutral-600 from-neutral-900 via-neutral-900 to-neutral-800 p-2 flex flex-col gap-2"
    >
      <Bridge />

      {children?.map((c) => (
        <div
          className={`overflow-hidden hover:bg-red-hover rounded-md p-1 ${idMenu === c?.id ? "bg-red-active" : ""}`}
          key={c?.id}
          onClick={() => handleChangeId(c?.id)}
        >
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="text-sm text-content-secondary"
          >
            {c?.title}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

const Bridge = () => <div className="absolute -top-3.5 left-0 right-0 h-6" />;
