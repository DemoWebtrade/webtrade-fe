import IndexInfor from "./index-infor";
import MenuBoard from "./menu-board";
import SettingBoard from "./setting";
import Table from "./table";

export default function PriceBoard() {
  return (
    <div className="w-full h-full flex flex-col gap-3 relative">
      <div className="h-40 w-full">
        <IndexInfor />
      </div>

      <div className="h-10 w-full flex flex-row items-center justify-between gap-2">
        <MenuBoard />
        <SettingBoard />
      </div>

      <div className="flex-1">
        <Table />
      </div>
    </div>
  );
}
