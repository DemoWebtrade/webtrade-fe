import OrderNormal from "@/components/order-smart/OrderNormal";

export default function Order() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-2 p-2 md:p-4">
      <div className="contents md:flex md:flex-col md:w-3/4 md:h-full md:gap-2 md:min-h-0">
        <div className="contents lg:flex lg:flex-row lg:gap-2 lg:h-2/3 lg:min-h-0">
          <div className="order-1 h-[35vh] lg:h-full flex-1 bg-bg-secondary rounded-md min-w-0">
            Tradingview
          </div>

          <div className="order-3 w-full lg:w-56 h-[18vh] lg:h-full flex flex-row lg:flex-col gap-2 shrink-0">
            <div className="flex-1 bg-bg-secondary rounded-md p-1 text-xs overflow-y-auto">
              Ba giá
            </div>
            <div className="flex-1 bg-bg-secondary rounded-md p-1 text-xs overflow-y-auto">
              Khớp lệnh
            </div>
          </div>
        </div>

        {/* Sổ lệnh */}
        <div className="order-4 h-[25vh] md:h-1/3 w-full bg-bg-secondary rounded-md overflow-auto">
          Sổ lệnh
        </div>
      </div>

      {/* Form đặt lệnh */}
      <div className="order-2 bg-bg-secondary w-full md:w-1/4 md:min-w-80 h-auto md:h-full rounded-md shrink-0">
        <h1 className="text-lg font-medium p-1 md:p-2">Đặt lệnh</h1>
        <OrderNormal />
      </div>
    </div>
  );
}
