import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectScroll } from "@/store/modules/priceboard/selector";
import { setExport, setStartScroll } from "@/store/modules/priceboard/slice";
import { BookX, Pause, Play } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SettingBoard() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const scroll = useAppSelector(selectScroll);

  const hanldeClickScroll = () => {
    dispatch(setStartScroll(!scroll));
  };

  const handleClickExport = () => {
    dispatch(setExport(true));
  };

  return (
    <div className="flex flex-row md:gap-2 items-center">
      {/* Tự động scroll */}
      <div className="flex w-full justify-center rounded-md hover:bg-red-hover active:bg-primary-active">
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

      {/* Cài đặt bảng giá */}
      <div
        className="hover:bg-bg-button p-1 rounded-md"
        data-tooltip-id="global-tooltip"
        data-tooltip-content={t("tooltip.board-csv")}
        data-tooltip-place="left"
        onClick={() => handleClickExport()}
      >
        <BookX className="size-5" />
      </div>
    </div>
  );
}
