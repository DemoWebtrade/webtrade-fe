import { useAppSelector } from "@/store/hook";
import { selectStockList } from "@/store/modules/priceboard/selector";
import { lazy, Suspense } from "react";

const BaseTable = lazy(() => import("./BaseTable"));

export default function Table() {
  const stocks = useAppSelector(selectStockList);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Suspense
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="progess-loader"></div>
          </div>
        }
      >
        <BaseTable data={stocks} />
      </Suspense>
    </div>
  );
}
