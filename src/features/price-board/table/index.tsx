import { MarketSocket } from "@/services/socket/market";
import { useEffect } from "react";
import BaseTable from "./BaseTable";

export default function Table() {
  useEffect(() => {
    MarketSocket.connect();
    MarketSocket.subscribe("VN30");

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
      <BaseTable />
    </div>
  );
}
