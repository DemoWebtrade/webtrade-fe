import OrderNormal from "@/components/order-smart/OrderNormal";
import PriceStep from "./PriceStep";
import TradingViewChart from "./TradingViewChart";

export default function Order() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row md:gap-2 gap-1 p-1 lg:p-2 md:p-4">
      <div className="contents md:flex md:flex-col md:w-3/4 md:h-full md:gap-2 md:min-h-0">
        <div className="contents lg:flex lg:flex-row lg:gap-2 lg:h-2/3 lg:min-h-0">
          <div className="order-1 min-h-[30vh] lg:h-full bg-bg-secondary rounded-md flex-1 min-w-0 flex flex-col">
            <TradingViewChart />
          </div>

          <div className="order-3 w-full lg:w-56 h-[18vh] lg:h-full flex flex-row lg:flex-col md:gap-2 gap-1 shrink-0">
            <div className="flex-1 bg-bg-secondary rounded-md overflow-y-auto flex flex-col border border-border">
              <h1 className="md:text-base text-sm font-medium px-2 py-1">
                Độ sâu thị trường
              </h1>
              <PriceStep />
            </div>
            <div className="flex-1 bg-bg-secondary rounded-md p-1 text-xs overflow-y-auto border border-border">
              <h1 className="md:text-base text-sm font-medium px-2 py-1">
                Khớp lệnh
              </h1>
            </div>
          </div>
        </div>

        {/* Sổ lệnh */}
        <div className="order-4 h-[25vh] md:h-1/3 w-full bg-bg-secondary rounded-md overflow-auto border border-border">
          <h1 className="md:text-base text-sm font-medium px-2 py-1">
            Sổ lệnh
          </h1>
        </div>
      </div>

      {/* Form đặt lệnh */}
      <div className="order-2 bg-bg-secondary w-full md:w-1/4 md:min-w-80 h-auto md:h-full rounded-md shrink-0 border border-border">
        <h1 className="md:text-base text-sm font-medium px-2 py-1">Đặt lệnh</h1>
        <OrderNormal />
      </div>
    </div>
  );
}
