import { LANGUAGE_KEY } from "@/configs";
import { useClickOutside } from "@/hooks/useClickOutside";
import type { LanguageKey } from "@/types";
import { getBrowserPreferredLang } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Earth, Info, Lightbulb, MonitorCog } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSetting from "./LanguageSetting";
import ThemeSetting from "./ThemeSetting";

export default function ClientSetting() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY) as LanguageKey | null;

    if (saved === "vi" || saved === "en") {
      if (saved !== i18n.resolvedLanguage) {
        i18n.changeLanguage(saved);
      }
      document.documentElement.lang = saved;
      return;
    }

    const preferred = getBrowserPreferredLang();
    const initial: LanguageKey = preferred === "vi" ? "vi" : "en";

    i18n.changeLanguage(initial);
    document.documentElement.lang = initial;
    localStorage.setItem(LANGUAGE_KEY, initial);
  }, [i18n]);

  const currentLang = (i18n.resolvedLanguage ||
    i18n.language ||
    "vi") as LanguageKey;

  const handleChangeLanguage = useCallback(() => {
    const next = currentLang === "vi" ? "en" : "vi";
    i18n.changeLanguage(next);
    localStorage.setItem(LANGUAGE_KEY, next);
    document.documentElement.lang = next;
  }, [currentLang, i18n]);

  useClickOutside(containerRef, () => {
    setOpen(false);
  });

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
    >
      <div
        className="p-1 hover:bg-bg-button rounded-md cursor-pointer"
        data-tooltip-id="global-tooltip"
        data-tooltip-content={t("setting-view")}
        data-tooltip-place="left"
        onClick={() => setOpen((pre) => !pre)}
      >
        <MonitorCog className="size-5" />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-[calc(100%+4px)] z-10 md:px-4 md:py-2 px-2 py-1 bg-bg-tertiary rounded-md md:w-60 w-44 border border-border flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1 md:gap-3">
              <div>
                <div className="flex flex-row items-center justify-between">
                  <div className="text-sm flex flex-row items-center justify-center gap-2">
                    <Lightbulb className="size-5 text-purple-base" />
                    <span>{t("topic")}</span>
                  </div>
                  <ThemeSetting />
                </div>
              </div>
              <div>
                <div className="flex flex-row items-center justify-between">
                  <div className="text-sm flex flex-row items-center justify-center gap-2">
                    <Earth className="size-5 text-purple-base" />
                    <span>{t("language")}</span>
                  </div>
                  <LanguageSetting
                    language={currentLang || "vi"}
                    handleChangeLanguage={handleChangeLanguage}
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-1 items-center border-t border-border h-8 px-2">
                  <span className="text-xs mt-2 hover:underline hover:text-purple-500">
                    {t("guide")}
                  </span>
                  <div
                    className="flex items-center justify-center mt-2"
                    data-tooltip-id="global-tooltip"
                    data-tooltip-content={t("tooltip.support")}
                  >
                    <Info size={12} className="text-content-disable" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
