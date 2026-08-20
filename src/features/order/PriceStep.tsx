import { useAppSelector } from "@/store/hook";
import { selectStockDetail } from "@/store/modules/priceboard/selector";
import { formatPrice, numberFormat } from "@/utils";
import { getColorClass } from "@/utils/stock";
import { useMemo } from "react";

export default function PriceStep() {
  const stockDetail = useAppSelector(selectStockDetail);

  const { totalBuy, totalSell, preTotalBuy, preTotalSell } = useMemo(() => {
    if (!stockDetail) {
      return { totalBuy: 0, totalSell: 0, preTotalBuy: 50, preTotalSell: 50 };
    }

    const totalBuy =
      (stockDetail.buyVol1 || 0) +
      (stockDetail.buyVol2 || 0) +
      (stockDetail.buyVol3 || 0);

    const totalSell =
      (stockDetail.sellVol1 || 0) +
      (stockDetail.sellVol2 || 0) +
      (stockDetail.sellVol3 || 0);

    const total = totalBuy + totalSell;

    const preTotalBuy = total === 0 ? 50 : Math.round((totalBuy / total) * 100);
    const preTotalSell = total === 0 ? 50 : 100 - preTotalBuy;

    return { totalBuy, totalSell, preTotalBuy, preTotalSell };
  }, [stockDetail]);

  const levels = [1, 2, 3] as const;

  return (
    <div className="h-full w-full">
      {/* Header */}
      <div className="flex flex-row text-xs md:text-sm">
        <div className="flex flex-row items-center justify-between bg-secondary-base px-1 md:px-2 py-2 w-1/2">
          <h2>KL</h2>
          <h2>Giá mua</h2>
        </div>
        <div className="flex flex-row items-center justify-between bg-secondary-base px-1 md:px-2 py-2 w-1/2">
          <h2>Giá bán</h2>
          <h2>KL</h2>
        </div>
      </div>

      {/* Body - 3 mức giá */}
      <div className="flex flex-row text-xs md:text-sm mt-0.5 md:mt-1 gap-0.5 md:gap-1">
        {/* Bên mua */}
        <div className="flex flex-col gap-0.5 md:gap-1 w-1/2">
          {levels.map((level) => {
            const vol = stockDetail?.[
              `buyVol${level}` as keyof typeof stockDetail
            ] as number | undefined;
            const price = stockDetail?.[
              `buyPrice${level}` as keyof typeof stockDetail
            ] as number | undefined;

            return (
              <div
                key={`buy-${level}`}
                className="flex flex-row items-center justify-between px-1 md:px-2 py-0.5 md:py-1 md:gap-1 gap-0.5 relative"
              >
                <span className="z-1">{numberFormat(vol)}</span>
                <span
                  className={`z-1 ${getColorClass(
                    price,
                    stockDetail?.ref,
                    stockDetail?.ceil,
                    stockDetail?.floor,
                  )}`}
                >
                  {formatPrice(price)}
                </span>
                <div
                  className="absolute bg-primary-active/10 right-0 top-0 rounded h-full"
                  style={{
                    width: `${vol ? Math.round((vol / totalBuy) * 100) : 0}%`,
                  }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Bên bán */}
        <div className="flex flex-col gap-0.5 md:gap-1 w-1/2">
          {levels.map((level) => {
            const vol = stockDetail?.[
              `sellVol${level}` as keyof typeof stockDetail
            ] as number | undefined;
            const price = stockDetail?.[
              `sellPrice${level}` as keyof typeof stockDetail
            ] as number | undefined;

            return (
              <div
                key={`sell-${level}`}
                className="flex flex-row items-center justify-between px-1 md:px-2 py-0.5 md:py-1 md:gap-1 gap-0.5 relative overflow-hidden"
              >
                <span
                  className={`z-1 ${getColorClass(
                    price,
                    stockDetail?.ref,
                    stockDetail?.ceil,
                    stockDetail?.floor,
                  )}`}
                >
                  {formatPrice(price)}
                </span>
                <span className="z-1">{numberFormat(vol)}</span>
                <div
                  className="absolute bg-primary-active/10 left-0 top-0 rounded h-full"
                  style={{
                    width: `${vol ? Math.round((vol / totalSell) * 100) : 0}%`,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress bar + Tổng dư */}
      <div className="flex flex-col gap-1 md:gap-2 items-center text-xs md:text-sm mt-1">
        <div className="flex flex-row items-center w-full px-1 md:px-2 md:h-1.5 h-1 overflow-hidden rounded">
          <div
            className="bg-green-active h-full rounded-l transition-all duration-500 ease-out"
            style={{ width: `${preTotalBuy}%` }}
          />
          <div
            className="bg-red-active h-full rounded-r transition-all duration-500 ease-out"
            style={{ width: `${preTotalSell}%` }}
          />
        </div>

        <div className="flex flex-row items-center justify-between w-full px-1 md:px-2">
          <div className="flex flex-row gap-0.5 md:gap-1 items-center">
            <span>Dư mua:</span>
            <span className="font-medium">{numberFormat(totalBuy)}</span>
          </div>
          <div className="flex flex-row items-center gap-0.5 md:gap-1 justify-end">
            <span>Dư bán:</span>
            <span className="font-medium">{numberFormat(totalSell)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
