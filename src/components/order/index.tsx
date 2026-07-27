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

  const [tabActive, setTabActive] = useState<string>("BASE");

  return (
    <div className="md:w-md w-full h-[calc(100%-4px)] bg-bg-secondary absolute right-0 top-1 z-1">
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

        <div className="text-content-primary">
          <X className="size-4 md:size-5" />
        </div>
      </div>

      {tabActive === "BASE" && <OrderNormal />}
    </div>
  );
}
