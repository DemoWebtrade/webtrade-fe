import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectOpenOrder } from "@/store/modules/order/selector";
import { setOpenOrder } from "@/store/modules/order/slice";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import OrderNormal from "./OrderNormal";

const MENU_ORDER = [
  {
    key: "BASE",
    label: "order.normal",
  },
  {
    key: "COND",
    label: "order.conditional",
  },
];

export default function Order() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectOpenOrder);

  const [tabActive, setTabActive] = useState<string>("BASE");

  const onClose = () => {
    dispatch(setOpenOrder(false));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            duration: 0.25,
            ease: "easeInOut",
          }}
          className="min-[488px]:w-md w-full h-[calc(100%-4px)] bg-bg-secondary absolute right-0 top-1 z-1"
        >
          <div>
            <div className="w-full flex flex-row items-center justify-between border-b border-border">
              <div className="flex flex-row">
                {MENU_ORDER.map((item) => (
                  <span
                    key={item.key}
                    className={`px-4 py-1 text-base text-center hover:text-content-primary ${tabActive === item.key ? "border-b-2 border-purple-active font-medium text-content-primary" : "text-content-tertiary"}`}
                    onClick={() => setTabActive(item.key)}
                  >
                    {t(item.label)}
                  </span>
                ))}
              </div>

              <div
                className="text-content-primary cursor-pointer"
                onClick={onClose}
              >
                <X className="size-4 md:size-5" />
              </div>
            </div>

            {tabActive === "BASE" && <OrderNormal />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
