import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectScroll } from "@/store/modules/priceboard/selector";
import { setExport, setStartScroll } from "@/store/modules/priceboard/slice";
import { BookX, Columns3Cog, Pause, Play } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SettingModal from "./SettingModal";

export default function SettingBoard() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const scroll = useAppSelector(selectScroll);

  const [openSetting, setOpenSetting] = useState(false);

  const hanldeClickScroll = () => {
    dispatch(setStartScroll(!scroll));
  };

  const handleClickExport = () => {
    dispatch(setExport(true));
  };

  return (
    <div className="flex flex-row md:gap-2 items-center">
      {/* Tự động scroll */}
      <div
        className="flex w-full justify-center rounded-md hover:bg-red-hover active:bg-primary-active"
        data-tour="prop-7"
      >
        <div
          className="hover:bg-bg-button p-1 rounded-md"
          data-tooltip-id="global-tooltip"
          data-tooltip-content={
            scroll ? t("tooltip.scroll-stop") : t("tooltip.scroll-auto")
          }
          data-tooltip-place="left"
          onClick={() => hanldeClickScroll()}
        >
          {scroll ? <Pause className="size-5" /> : <Play className="size-5" />}
        </div>
      </div>

      {/* Xuất file Excel */}
      <div
        className="hover:bg-bg-button p-1 rounded-md"
        data-tooltip-id="global-tooltip"
        data-tooltip-content={t("tooltip.board-csv")}
        data-tooltip-place="left"
        onClick={() => handleClickExport()}
        data-tour="prop-8"
      >
        <BookX className="size-5" />
      </div>

      {/* Cài đặt bảng giá */}
      <div
        className="hover:bg-bg-button p-1 rounded-md"
        data-tooltip-id="global-tooltip"
        data-tooltip-content={t("tooltip.setting-cols")}
        data-tooltip-place="left"
        data-tour="prop-9"
        onClick={() => setOpenSetting(true)}
      >
        <Columns3Cog size={20} />
      </div>

      <SettingModal
        isOpen={openSetting}
        onClose={() => setOpenSetting(false)}
      />
    </div>
  );
}
