import i18n from "@/lib/i18n";
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
      className="relative flex gap-2"
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
        <div className="flex flex-row md:gap-1 gap-0.5 items-center justify-center">
          <div className="text-sm flex items-center justify-center leading-0">
            {t?.children?.some((i) => i?.id === id)
              ? i18n.t(`${t?.children?.find((i) => i?.id === id)?.title}`)
              : i18n.t(`${t?.title}`)}
          </div>

          {t?.children && (
            <ChevronDown
              size={16}
              className={`${selected === t.id && "rotate-180"}`}
            />
          )}
        </div>
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
      className={`flex items-center justify-center gap-1 rounded-md px-1 md:px-3 md:py-1.5 py-0.5 text-sm transition-colors h-7 ${
        selected === tab
          ? "bg-purple-active text-white"
          : "text-content-primary"
      }  ${active ? "bg-purple-active text-white" : ""}`}
    >
      {children}
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
      className="absolute left-0 top-[calc(100%+14px)] w-40 rounded-lg border border-neutral-600 bg-bg-secondary p-2 flex flex-col gap-2 z-50"
    >
      <Bridge />

      {children?.map((c) => (
        <div
          className={`overflow-hidden hover:bg-purple-hover hover:text-white rounded-md p-1 ${idMenu === c?.id ? "bg-purple-active text-white!" : "text-content-primary"}`}
          key={c?.id}
          onClick={() => handleChangeId(c?.id)}
        >
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="text-sm"
          >
            {c?.title}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

const Bridge = () => <div className="absolute -top-3.5 left-0 right-0 h-6" />;
