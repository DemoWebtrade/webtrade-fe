import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BenAccount from "./components/BenAccount";
import GenInformation from "./components/GenInformation";

const MENU_PROFILE = [
  {
    label: "user.gen-infor",
    value: "INFOR",
  },
  {
    label: "user.account-ben",
    value: "ACCOUNT",
  },
];

export default function Profile() {
  const { t } = useTranslation();

  const [feature, setFeature] = useState("INFOR");

  return (
    <motion.div
      initial={{ opacity: 0, x: 10, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute top-[calc(100%+4px)] md:top-[calc(100%+12px)] -right-0.5 md:-right-2 z-10 bg-bg-tertiary shadow-md py-2 md:py-3 md:w-100 w-[calc(100svw)] md:h-[calc(100svh-52px)] h-[calc(100svh-48px)] overflow-hidden"
    >
      <div className="flex flex-col gap-2 w-full h-full">
        {/* Menu */}
        <div className="flex flex-row items-center w-full">
          {MENU_PROFILE.map((item) => (
            <div
              key={item.value}
              className={`w-1/2 whitespace-nowrap text-center text-base pb-1.5 md:pb-3 border-b-2 cursor-pointer ${feature === item.value ? "font-semibold text-purple-base border-purple-selected" : "border-purple-base/10"}`}
              onClick={() => setFeature(item.value)}
            >
              {t(item.label)}
            </div>
          ))}
        </div>
        {/* Content */}
        <div className="flex-1 min-h-0">
          {feature === "INFOR" && <GenInformation />}
          {feature === "ACCOUNT" && <BenAccount />}
        </div>
      </div>
    </motion.div>
  );
}
