import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BenAccount from "./components/BenAccount";
import GenInformation from "./components/GenInformation";
import Security from "./components/Security";

const MENU_PROFILE = [
  {
    label: "user.gen-infor",
    value: "INFOR",
  },
  {
    label: "user.account-ben",
    value: "ACCOUNT",
  },
  {
    label: "user.security",
    value: "SECURITY",
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
      className="absolute top-12 md:top-10 right-0 md:-right-1.5 z-10 bg-bg-tertiary shadow-md py-2 md:py-3 rounded-md md:w-100 w-[calc(100svw-4px)] h-[calc(100svh-53px)] overflow-auto"
    >
      <div className="flex flex-col gap-2">
        {/* Menu */}
        <div className="flex flex-row items-center w-full">
          {MENU_PROFILE.map((item) => (
            <div
              key={item.value}
              className={`w-1/3 whitespace-nowrap text-center text-sm pb-1 md:pb-2 border-b-2 cursor-pointer ${feature === item.value ? "font-semibold text-purple-base border-purple-selected" : "border-purple-base/10"}`}
              onClick={() => setFeature(item.value)}
            >
              {t(item.label)}
            </div>
          ))}
        </div>
        {/* Content */}
        {feature === "INFOR" && <GenInformation />}
        {feature === "ACCOUNT" && <BenAccount />}
        {feature === "SECURITY" && <Security />}
      </div>
    </motion.div>
  );
}
