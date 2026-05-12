import { MarketSocket } from "@/services/socket/market";
import { useAppSelector } from "@/store/hook";
import { selectAllStocks } from "@/store/modules/priceboard/selector";
import { useEffect } from "react";
import BaseTable from "./BaseTable";

export default function Table({ marketStatus }: { marketStatus: string }) {
  const stocks = useAppSelector(selectAllStocks);

  useEffect(() => {
    if (marketStatus === "connected") MarketSocket.subscribe("VN30");
    return () => {
      MarketSocket.unsubscribe("VN30");
    };
  }, [marketStatus]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <BaseTable data={stocks} />
    </div>
  );
}
