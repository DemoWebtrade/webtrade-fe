import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectOpenOrder } from "@/store/modules/order/selector";
import { setOpenOrder } from "@/store/modules/order/slice";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import OrderCondition from "./OrderCondition";
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
    setTabActive("BASE");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="min-[488px]:w-md w-[90%] h-[calc(100%-4px)] absolute right-0 top-1 z-1 overflow-hidden">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="bg-bg-secondary w-full h-full"
          >
            <div className="w-full">
              <div className="flex flex-row">
                {MENU_ORDER.map((item) => (
                  <span
                    key={item.key}
                    className={`w-1/2 whitespace-nowrap text-center text-base pt-1 pb-1.5 md:pb-3 border-b-2 cursor-pointer ${tabActive === item.key ? "border-purple-active font-medium text-content-primary" : "text-content-tertiary"}`}
                    onClick={() => setTabActive(item.key)}
                  >
                    {t(item.label)}
                  </span>
                ))}
              </div>

              <div
                className="text-content-primary cursor-pointer absolute top-1 right-1"
                onClick={onClose}
              >
                <X className="size-4 md:size-5" />
              </div>

              {tabActive === "BASE" && <OrderNormal />}
              {tabActive === "COND" && <OrderCondition />}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
