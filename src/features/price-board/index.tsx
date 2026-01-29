import IndexInfor from "./index-infor";

export default function PriceBoard() {
  return (
    <div className="w-full h-full flex flex-col gap-1">
      <div className="h-40 w-full">
        <IndexInfor />
      </div>
    </div>
  );
}
