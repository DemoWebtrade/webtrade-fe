import { Button } from "@/components/ui/Button";
import { MarketSocket } from "@/services/socket/market";
import { useAppSelector } from "@/store/hook";
import { selectMarketStatus } from "@/store/modules/socket/selector";
import { lazy, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SekeletonChartIndex from "./index-infor/Sekeleton";
import MenuBoard from "./menu-board";
import SettingBoard from "./setting";
import Table from "./table";

const IndexInfor = lazy(() => import("./index-infor"));

export default function PriceBoard() {
  const { t } = useTranslation();
  const marketStatus = useAppSelector(selectMarketStatus);

  const [id, setId] = useState<string>("VN30");

  useEffect(() => {
    if (marketStatus === "connected" && id) {
      MarketSocket.subscribe(id);
    }

    return () => {
      if (id) MarketSocket.unsubscribe(id);
    };
  }, [marketStatus, id]);

  return (
    <div className="w-full h-full flex flex-col gap-3 relative px-2 md:px-4">
      <div className="h-40 w-full">
        <Suspense fallback={<SekeletonChartIndex />}>
          <IndexInfor />
        </Suspense>
      </div>

      <div className="h-10 w-full flex flex-row items-center justify-between md:gap-4 gap-2">
        <MenuBoard id={id} setId={setId} />

        <div className="flex flex-row items-center justify-between md:gap-4 gap-2">
          {/* status socket market */}
          <div
            data-tooltip-id="global-tooltip"
            data-tooltip-content={`${t("status.status")}: ${
              marketStatus === "connected"
                ? t("status.connected")
                : t("status.disconnected")
            }`}
            className="cursor-pointer"
          >
            <span className="relative flex size-2">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full ${marketStatus === "connected" ? "bg-green-500" : "bg-red-active"}  opacity-75`}
              ></span>
              <span
                className={`relative inline-flex size-2 rounded-full  ${marketStatus === "connected" ? "bg-green-500" : "bg-red-active"}`}
              ></span>
            </span>
          </div>

          <div className="h-4 w-px bg-border md:mx-2 max-[550px]:hidden"></div>

          <SettingBoard />

          <div className="h-4 w-px bg-border md:mx-2 max-[550px]:hidden"></div>

          {/* Đặt lệnh */}
          <div data-tour="prop-10">
            {" "}
            <Button className="w-auto whitespace-nowrap" variant="success">
              {t("order")}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <Table id={id} />
      </div>
    </div>
  );
}
