import { ShiftingDropDown } from "@/components/ui/ShiftingDropDown";
import { MENU_BOARD } from "@/configs";
import { MarketSocket } from "@/services/socket/market";
import { useEffect, useState } from "react";

export default function MenuBoard({ marketStatus }: { marketStatus: string }) {
  const [id, setId] = useState<string>("VN30");

  useEffect(() => {
    if (marketStatus === "connected" && id) {
      MarketSocket.subscribe(id);
    }

    return () => {
      if (id) MarketSocket.unsubscribe(id);
    };
  }, [marketStatus, id]);

  const handleChangeId = (id: string) => {
    setId(id);
  };

  return (
    <div
      className="w-full h-full flex flex-wrap md:gap-2 gap-1 items-center"
      data-tour="prop-6"
    >
      {MENU_BOARD.map((t, index) => (
        <ShiftingDropDown
          key={index}
          t={t}
          id={id}
          handleChangeId={handleChangeId}
        />
      ))}
    </div>
  );
}
