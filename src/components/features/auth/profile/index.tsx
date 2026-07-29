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
    <div className="absolute -top-1 right-1 z-10 shadow-md py-2 md:py-3 md:w-100 w-[90%] h-full overflow-hidden">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        className="bg-bg-tertiary w-full h-full"
      >
        <div className="flex flex-col gap-2 w-full h-full">
          {/* Menu */}
          <div className="flex flex-row items-center w-full">
            {MENU_PROFILE.map((item) => (
              <div
                key={item.value}
                className={`w-1/2 whitespace-nowrap text-center text-base pt-1 pb-1.5 md:pb-3 border-b-2 cursor-pointer ${feature === item.value ? "border-purple-active font-medium text-content-primary" : "text-content-tertiary"}`}
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
    </div>
  );
}
