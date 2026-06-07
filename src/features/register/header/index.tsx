import Logo from "@/assets/imgs/logo/lhc_logo.png";
import LanguageSetting from "@/components/features/header/component/LanguageSetting";
import ThemeSetting from "@/components/features/header/component/ThemeSetting";
import { LANGUAGE_KEY } from "@/configs";
import type { LanguageKey } from "@/types";
import { getBrowserPreferredLang } from "@/utils/global";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Earth, Info, Lightbulb, Settings } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function RegisterHeader() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const navigate = useNavigate();

  const currentLang = (i18n.resolvedLanguage ||
    i18n.language ||
    "vi") as LanguageKey;

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
  }, []);

  // Toggle handler
  const handleChangeLanguage = useCallback(() => {
    const next = currentLang === "vi" ? "en" : "vi";
    i18n.changeLanguage(next);
    localStorage.setItem(LANGUAGE_KEY, next);
    document.documentElement.lang = next;
  }, [currentLang, i18n]);

  return (
    <header className="flex items-center justify-between w-full h-full bg-bg-secondary md:px-2 pr-0.5 border-b border-border md:gap-8 gap-4 max-[425px]:gap-0">
      <div
        className="flex flex-row items-center md:gap-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="logo" className="w-12 h-full" />
      </div>

      <Menu as="div" className="relative inline-block" data-tour="prop-3">
        <MenuButton className="flex w-full justify-center rounded-md hover:bg-red-hover active:bg-primary-active">
          <div
            className="hover:bg-bg-button p-1 rounded-md"
            data-tooltip-id="global-tooltip"
            data-tooltip-content={t("setting-view")}
            data-tooltip-place="left"
          >
            <Settings className="size-5" />
          </div>
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 md:px-4 md:py-2 px-2 py-1 bg-border rounded-md md:w-60 w-44 border border-border-informative/10 flex flex-col gap-3 origin-top-right outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="flex flex-col gap-1 md:gap-3">
            <MenuItem>
              <div className="flex flex-row items-center justify-between">
                <div className="text-sm flex flex-row items-center justify-center gap-2">
                  <Lightbulb className="size-5 text-purple-base" />
                  <span>{t("topic")}</span>
                </div>
                <ThemeSetting />
              </div>
            </MenuItem>
            <MenuItem>
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
            </MenuItem>
            <MenuItem>
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
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </header>
  );
}
