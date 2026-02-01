import IndexInfor from "./index-infor";
import MenuBoard from "./menu-board";

export default function PriceBoard() {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="h-40 w-full">
        <IndexInfor />
      </div>

      <div className="h-10 w-full">
        <MenuBoard />
      </div>
    </div>
  );
}
