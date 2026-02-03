import { ShiftingDropDown } from "@/components/ui/ShiftingDropDown";
import { MENU_BOARD } from "@/configs";
import { useState } from "react";

export default function MenuBoard() {
  const [id, setId] = useState<string>("vn30");

  const handleChangeId = (id: string) => {
    setId(id);
  };

  return (
    <div className="w-full h-full flex flex-row md:gap-2 gap-1.5 items-center">
      {MENU_BOARD.map((t) => (
        <ShiftingDropDown t={t} id={id} handleChangeId={handleChangeId} />
      ))}
    </div>
  );
}
