import Logo from "@/assets/imgs/logo/lhc_logo.png";
import { Expand, Shrink } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ClientSetting from "./component/ClientSetting";
import DayTrading from "./component/DayTrading";
import Login from "./component/Login";
import Notifications from "./component/Notifications";
import Slogan from "./component/Slogan";

export default function Header() {
  const { t } = useTranslation();

  const [isZoom, setIsZoom] = useState(false);

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
    <header className="flex items-center justify-between w-full h-full bg-bg-secondary md:px-4 px-2 pr-0.5 gap-1 md:gap-8">
      <div className="flex flex-row items-center gap-1 md:gap-2">
        <img src={Logo} alt="logo" className="w-10 min-w-8 h-full" />

        <div className="flex flex-row items-center gap-1 md:gap-2 max-[425px]:hidden">
          <span className="text-base font-bold">WebTrade</span>
          <div className="text-[8px] font-bold px-1 rounded bg-purple-selected text-white grid place-items-center h-max">
            PRO
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center md:gap-4 gap-1">
        {/* slogan */}
        <div className="max-[870px]:hidden w-50 min-[1057px]:w-90 min-[1120px]:w-100 min-[1120px]:flex">
          <Slogan />
        </div>

        <div className="h-4 w-px bg-border md:mx-2 max-[1120px]:hidden"></div>
        {/* time */}
        <div data-tour="prop-1">
          <DayTrading />
        </div>

        {/* Chức năng */}
        <div className="flex flex-row items-center justify-center md:gap-2 min-[321px]:gap-1 pr-3 md:pr-2">
          <div className="h-4 w-px bg-border md:mx-2 max-[550px]:hidden"></div>

          <div data-tour="prop-2">
            {/* Thông báo */}
            <Notifications />
          </div>

          <div data-tour="prop-3">
            {/* Cài đặt giao diện */}
            <ClientSetting />
          </div>

          {/* Zoom web */}
          <div data-tour="prop-4">
            {isZoom ? (
              <div
                className="p-1 hover:bg-bg-button rounded-md cursor-pointer"
                data-tooltip-id="global-tooltip"
                data-tooltip-content={t("shrink-web")}
                onClick={() => handleToggleFullscreen()}
              >
                <Shrink className="size-4" />
              </div>
            ) : (
              <div
                className="p-1 hover:bg-bg-button rounded-md cursor-pointer"
                data-tooltip-id="global-tooltip"
                data-tooltip-content={t("explan-web")}
                onClick={() => handleToggleFullscreen()}
              >
                <Expand className="size-4" />
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-border md:mx-2 max-[550px]:hidden"></div>

          {/* login */}
          <Login />
        </div>
      </div>
    </header>
  );
}
