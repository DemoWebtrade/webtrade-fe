import { Button } from "@/components/ui/Button";
import { MarketSocket } from "@/services/socket/market";
import { useAppSelector } from "@/store/hook";
import { selectMarketStatus } from "@/store/modules/socket/selector";
import { lazy, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SekeletonChartIndex from "./index-infor/Sekeleton";
import MenuBoard from "./menu-board";
import SearchStock from "./search-stock";
import SettingBoard from "./setting";
import Status from "./status";
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
    <div className="w-full h-full flex flex-col gap-3 relative p-2 md:p-4">
      <div className="h-40 w-full">
        <Suspense fallback={<SekeletonChartIndex />}>
          <IndexInfor />
        </Suspense>
      </div>

      <div className="h-10 w-full flex flex-row items-center justify-between md:gap-4 gap-2">
        <div className="flex flex-row gap-2 items-center flex-1 min-w-0">
          <SearchStock />

          <div className="flex-1 min-w-0">
            <MenuBoard id={id} setId={setId} />
          </div>
        </div>

        <div className="flex flex-row items-center justify-between md:gap-4 gap-2 shrink-0">
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

      <div className="flex-1 flex flex-col bg-secondary-base rounded-xl">
        <Table id={id} />

        <div className="w-full">
          <Status marketStatus={marketStatus} />
        </div>
      </div>
    </div>
  );
}
