import { MarketSocket } from "@/services/socket/market";
import { useAppSelector } from "@/store/hook";
import { selectAllStocks } from "@/store/modules/priceboard/selector";
import { useEffect } from "react";
import BaseTable from "./BaseTable";

export default function Table() {
  const stocks = useAppSelector(selectAllStocks);

  useEffect(() => {
    MarketSocket.connect();
    setTimeout(() => {
      MarketSocket.subscribe("VN30");
    }, 5000);

    return () => {
      MarketSocket.unsubscribe("VN30");
      MarketSocket.close();
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <BaseTable data={stocks} />
    </div>
  );
}
