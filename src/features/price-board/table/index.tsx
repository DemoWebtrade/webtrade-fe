import { useAppSelector } from "@/store/hook";
import { selectStockList } from "@/store/modules/priceboard/selector";
import BaseTable from "./BaseTable";

export default function Table() {
  const stocks = useAppSelector(selectStockList);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <BaseTable data={stocks} />
    </div>
  );
}
