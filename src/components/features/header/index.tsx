import Logo from "@/assets/imgs/logo/lhc_logo.png";
import { LANGUAGE_KEY } from "@/configs/global";
import type { LanguageKey } from "@/types";
import { getBrowserPreferredLang } from "@/utils/global";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Earth, Expand, Lightbulb, Settings, Shrink } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DayTrading from "./component/DayTrading";
import LanguageSetting from "./component/LanguageSetting";
import Login from "./component/Login";
import Notifications from "./component/Notifications";
import Slogan from "./component/Slogan";
import ThemeSetting from "./component/ThemeSetting";

export default function Header() {
  const { t } = useTranslation();

  const { i18n } = useTranslation();
  const [isZoom, setIsZoom] = useState(false);

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

  const handleToggleFullscreen = () => {
    const elem = document.documentElement as HTMLElement;

    if (!document.fullscreenElement) {
      // Vào fullscreen
      if (elem.requestFullscreen) {
        elem
          .requestFullscreen()
          .then(() => {
            setIsZoom(true);
          })
          .catch((err) => {
            console.error("Không thể bật fullscreen:", err);
          });
      } else if (
        (
          elem as HTMLElement & {
            webkitRequestFullscreen?: () => Promise<void>;
          }
        ).webkitRequestFullscreen
      ) {
        (
          elem as HTMLElement & {
            webkitRequestFullscreen: () => Promise<void>;
          }
        ).webkitRequestFullscreen();
        setIsZoom(true);
      } else if (
        (elem as HTMLElement & { msRequestFullscreen?: () => Promise<void> })
          .msRequestFullscreen
      ) {
        (
          elem as HTMLElement & { msRequestFullscreen: () => Promise<void> }
        ).msRequestFullscreen();
        setIsZoom(true);
      }
    } else {
      // Thoát fullscreen
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            setIsZoom(false);
          })
          .catch((err) => {
            console.error("Không thể thoát fullscreen:", err);
          });
      } else if (
        (
          document as Document & {
            webkitExitFullscreen?: () => Promise<void>;
          }
        ).webkitExitFullscreen
      ) {
        (
          document as Document & { webkitExitFullscreen: () => Promise<void> }
        ).webkitExitFullscreen();
        setIsZoom(false);
      } else if (
        (document as Document & { msExitFullscreen?: () => Promise<void> })
          .msExitFullscreen
      ) {
        (
          document as Document & { msExitFullscreen: () => Promise<void> }
        ).msExitFullscreen();
        setIsZoom(false);
      }
    }
  };

  return (
    <header className="flex items-center justify-between w-full h-full bg-bg-secondary md:pr-2 pr-0.5 border-b border-border md:gap-8 gap-6 max-[425px]:gap-0">
      {/* Day trading */}
      <div className="flex flex-row items-center md:gap-6">
        <img src={Logo} alt="logo" className="w-12 h-full" /> <DayTrading />
      </div>

      <div className="flex flex-row items-center justify-center gap-4">
        {/* slogan */}
        <div className="max-[620px]:hidden min-[620px]:w-50 lg:w-100">
          <Slogan />
        </div>

        {/* Chức năng */}
        <div className="flex flex-row items-center justify-center md:gap-2 min-[321px]:gap-1">
          <div className="h-4 w-px bg-bg-tertiary md:mx-2 max-[550px]:hidden"></div>

          {/* Thông báo */}
          <Notifications />

          {/* Cài đặt giao diện */}
          <Menu as="div" className="relative inline-block">
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
              className="absolute right-0 z-10 md:px-4 md:py-2 px-2 py-1 bg-bg-tertiary rounded-md md:w-60 w-44 border border-border-informative/10 flex flex-col gap-3 origin-top-right outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="flex flex-col gap-1 md:gap-3">
                <MenuItem>
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-sm flex flex-row items-center justify-center gap-2">
                      <Lightbulb className="size-5 text-red-base" />
                      <span>{t("topic")}</span>
                    </div>
                    <ThemeSetting />
                  </div>
                </MenuItem>
                <MenuItem>
                  <div className="flex flex-row items-center justify-between">
                    <div className="text-sm flex flex-row items-center justify-center gap-2">
                      <Earth className="size-5 text-red-base" />
                      <span>{t("language")}</span>
                    </div>
                    <LanguageSetting
                      language={currentLang || "vi"}
                      handleChangeLanguage={handleChangeLanguage}
                    />
                  </div>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>

          {/* Zoom web */}
          {isZoom ? (
            <div
              className="p-1 hover:bg-bg-button rounded-md"
              data-tooltip-id="global-tooltip"
              data-tooltip-content={t("shrink-web")}
              onClick={() => handleToggleFullscreen()}
            >
              <Shrink className="size-4" />
            </div>
          ) : (
            <div
              className="p-1 hover:bg-bg-button rounded-md"
              data-tooltip-id="global-tooltip"
              data-tooltip-content={t("explan-web")}
              onClick={() => handleToggleFullscreen()}
            >
              <Expand className="size-4" />
            </div>
          )}

          <div className="h-4 w-px bg-bg-tertiary md:mx-2 max-[550px]:hidden"></div>

          {/* login */}
          <Login />
        </div>
      </div>
    </header>
  );
}
