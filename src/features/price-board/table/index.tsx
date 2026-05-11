import { MarketSocket } from "@/services/socket/market";
import { useEffect } from "react";
import BaseTable from "./BaseTable";
import { useAppSelector } from "@/store/hook";
import { selectAllStocks } from "@/store/modules/priceboard/selector";

export default function Table() {
  const stocks = useAppSelector(selectAllStocks);

  useEffect(() => {
    MarketSocket.connect();
    setTimeout(() => {
      MarketSocket.subscribe("VN30");
    }, 5000);

    // MarketSocket.on("marketSnapshot", (data) => {
    //   console.log("data", data);
    // });

    // MarketSocket.on("marketUpdate", (updated) => {
    //   console.log("update", updated);
    // });

    return () => {
      MarketSocket.unsubscribe("VN30");
      // MarketSocket.off("marketSnapshot");
      // MarketSocket.off("marketUpdate");
      MarketSocket.close();
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <BaseTable data={stocks} />
    </div>
  );
}
