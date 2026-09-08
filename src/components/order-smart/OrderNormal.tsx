import { LIST_STOCKS, MARKET_TYPE, PRICE_TYPE } from "@/configs";
import { usePlaceOrder } from "@/hooks/usePlaceOrder";
import { MarketSocket } from "@/services/socket/market";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectListAccount } from "@/store/modules/auth/selector";
import {
  selectStockDetail,
  selectSymbols,
} from "@/store/modules/priceboard/selector";
import { setSymbolStocksDetail } from "@/store/modules/priceboard/slice";
import { selectMarketStatus } from "@/store/modules/socket/selector";
import { formatPrice, numberFormat, StringToInt } from "@/utils";
import { getColorClass } from "@/utils/stock";
import { Info } from "lucide-react";
import { useEffect } from "react";
import {
  Controller,
  useForm,
  useWatch,
  type FieldError,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import InputPrice from "../ui/inputs/InputPrice";
import { InputSearchStockSmartField } from "../ui/inputs/InputSearchStockSmartField";
import InputVolume from "../ui/inputs/InputVolume";
import SelectField from "../ui/inputs/SelectField";

type OrderFormValues = {
  stockCode: string;
  orderPrice: string | number;
  orderVolume: number | null;
  accountCode: string;
};

export default function OrderNormal() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const listAccount = useAppSelector(selectListAccount);
  const stockDetail = useAppSelector(selectStockDetail);
  const symbols = useAppSelector(selectSymbols);
  const marketStatus = useAppSelector(selectMarketStatus);

  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<OrderFormValues>({
    defaultValues: {
      stockCode: "",
      orderPrice: "",
      orderVolume: null,
    },
  });

  const stockCode = useWatch({
    control,
    name: "stockCode",
  });

  const stockInfor = LIST_STOCKS.find((s) => s.code === stockCode);

  const orderPrice = useWatch({
    control,
    name: "orderPrice",
  });
  const orderVolume = useWatch({
    control,
    name: "orderVolume",
  });

  const { place } = usePlaceOrder();

  useEffect(() => {
    return () => {
      reset({
        stockCode: "",
        orderPrice: "",
        orderVolume: null,
      });
    };
  }, [reset]);

  useEffect(() => {
    if (listAccount && listAccount.length > 0) {
      setValue("accountCode", listAccount[0]?.accountNumber + "");
    }
  }, [listAccount, setValue]);

  useEffect(() => {
    if (!stockCode) return;

    if (!symbols?.includes(stockCode) && marketStatus === "connected") {
      MarketSocket.subscribeSymbols([stockCode]);
    }

    dispatch(setSymbolStocksDetail(stockCode));

    return () => {
      if (stockCode && !symbols?.includes(stockCode))
        MarketSocket.unsubscribeSymbols([stockCode]);
    };
  }, [stockCode, symbols, marketStatus, dispatch]);

  const handleValidateVolume = (volume: string | number | null) => {
    if (!volume) {
      return "validate.volume-required";
    }

    const numericVolume = StringToInt(volume);

    if (numericVolume < 100 && typeof orderPrice !== "number") {
      return "validate.volume-incorrect-pl";
    }

    if (
      !numericVolume ||
      numericVolume <= 0 ||
      (numericVolume > 100 && numericVolume % 100 !== 0)
    ) {
      return "validate.volume-incorrect";
    }

    if (
      numericVolume > 500_000 &&
      stockInfor?.exchange?.toUpperCase() === "HOSE"
    ) {
      return "validate.volume-incorrect";
    }
  };

  const handleValidatePrice = (price: number | string | null) => {
    if (!price) {
      return "validate.price-required";
    }

    // validate theo sàn
    const market = stockInfor?.exchange?.toUpperCase();

    if (typeof price === "string" && price && PRICE_TYPE?.includes(price)) {
      if (market && !MARKET_TYPE?.[market]?.includes(price)) {
        return market === "HOSE"
          ? "validate.price-incorrect-hose"
          : market === "HNX"
            ? "validate.price-incorrect-hnx"
            : market === "UPCOM"
              ? "validate.price-incorrect-upcom"
              : "validate.price-incorrect";
      }

      return;
    }

    const numericPrice = StringToInt(price);

    if (!numericPrice || numericPrice <= 0) {
      return "validate.price-incorrect";
    }

    const priceInVnd = Math.round(numericPrice * 1000);
    const step = numericPrice < 10 ? 10 : numericPrice < 50 ? 50 : 100;

    if (stockDetail && priceInVnd > stockDetail?.ceil) {
      return "validate.price-incorrect-ceil";
    }

    if (stockDetail && priceInVnd < stockDetail?.floor) {
      return "validate.price-incorrect-floor";
    }

    if (market === "HOSE") {
      if (Math.round(priceInVnd % step) !== 0) {
        return "validate.price-incorrect";
      }
    }

    if (market === "HNX") {
      if (Math.round(priceInVnd % 100) !== 0) {
        return "validate.price-incorrect";
      }
    }
  };

  const onBuy = handleSubmit((data) => {
    const { stockCode, orderPrice, orderVolume, accountCode } = data;

    place({
      tradingAccountId: accountCode,
      symbol: stockCode,
      side: "buy",
      orderType: PRICE_TYPE?.includes(orderPrice + "") ? orderPrice + "" : "LO",
      price: orderPrice
        ? PRICE_TYPE?.includes(orderPrice + "")
          ? (stockDetail?.ceil ?? 0)
          : +orderPrice * 1000
        : 0,
      quantity: orderVolume ? StringToInt(orderVolume) : 0,
    });
  });

  const onSell = handleSubmit((data) => {
    const { stockCode, orderPrice, orderVolume, accountCode } = data;

    place({
      tradingAccountId: accountCode,
      symbol: stockCode,
      side: "sell",
      orderType: PRICE_TYPE?.includes(orderPrice + "") ? orderPrice + "" : "LO",
      price: orderPrice
        ? PRICE_TYPE?.includes(orderPrice + "")
          ? (stockDetail?.ceil ?? 0)
          : +orderPrice * 1000
        : 0,
      quantity: orderVolume ? StringToInt(orderVolume) : 0,
    });
  });

  return (
    <form className="p-1 md:p-2 text-sm flex flex-col gap-2">
      <div className="flex flex-row items-center">
        <div className="w-2/5 md:w-1/3">
          <Controller
            name="stockCode"
            control={control}
            render={({ field }) => (
              <InputSearchStockSmartField
                name="stockCode"
                className="text-base! px-1!"
                value={field.value}
                onStockSelect={(stock) => {
                  field.onChange(stock.code);
                  reset({
                    stockCode: stock.code,
                    orderPrice: "",
                    orderVolume: null,
                    accountCode: listAccount?.[0]?.accountNumber ?? "",
                  });
                }}
              />
            )}
          />
        </div>

        <div className="flex-1">
          {stockCode ? (
            <div className="flex flex-row items-start justify-between text-xs gap-2">
              {/* Thông tin mã chứng khoán */}
              <div className="flex flex-col items-start w-1/2 min-w-0">
                <div
                  className={`flex flex-row items-baseline gap-1 flex-wrap ${getColorClass(
                    stockDetail?.matchPrice,
                    stockDetail?.ref || 0,
                    stockDetail?.ceil || 0,
                    stockDetail?.floor || 0,
                  )}`}
                >
                  <span className="font-medium truncate">
                    {stockDetail?.matchPrice
                      ? formatPrice(stockDetail?.matchPrice)
                      : "0"}
                  </span>
                  <span className="whitespace-nowrap text-[10px] sm:text-xs">
                    (
                    {stockDetail?.change
                      ? formatPrice(stockDetail?.change)
                      : "0"}{" "}
                    {stockDetail?.changePct
                      ? formatPrice(stockDetail?.changePct || 0)
                      : "0"}
                    %)
                  </span>
                </div>

                <div className="flex flex-row items-center justify-between w-full gap-1">
                  <span className="text-purple-base truncate">
                    {formatPrice(stockDetail?.ceil || 0)}
                  </span>
                  <span className="text-yellow-base truncate">
                    {formatPrice(stockDetail?.ref || 0)}
                  </span>
                  <span className="text-blue-base truncate">
                    {formatPrice(stockDetail?.floor || 0)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end w-1/2 min-w-0">
                <span className="whitespace-nowrap">{t("status.closed")}</span>
                <span className="text-right truncate w-full">
                  <span className="text-content-tertiary">
                    {t("order.value-total")}
                  </span>{" "}
                  {numberFormat(stockDetail?.totalVolume)}
                </span>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {/* Tài khoản đặt lệnh */}
      <div className="flex flex-row items-start">
        <span className="font-medium w-2/5 md:w-1/3 text-xs sm:text-sm text-content-tertiary">
          {t("input.order-account")}
        </span>

        <div className="flex-1">
          <SelectField
            name="accountCode"
            options={listAccount?.map((item) => ({
              label: item.accountNumber,
              value: item.accountNumber,
            }))}
            registration={register("accountCode", {
              required: t("Vui lòng chọn tài khoản đặt lệnh"),
            })}
            error={errors.accountCode as FieldError}
            className="px-1! py-0.5!"
          />{" "}
        </div>
      </div>
      {/* Sức mua */}
      <div className="flex flex-row items-start">
        <div className="font-medium w-2/5 md:w-1/3 text-xs sm:text-sm text-content-tertiary flex flex-wrap items-center gap-1">
          <span className="font-medium">{t("order.buy-power")}</span>
          <div
            className="flex items-center justify-center"
            data-tooltip-id="global-tooltip"
            data-tooltip-content={t("tooltip.buy-power")}
            data-tooltip-place="right"
          >
            <Info className="text-content-disable size-3" />
          </div>
        </div>
        <div className="flex-1 flex flex-row">
          <p className="pr-1">0 {t("vnd")}</p> (
          <p className="text-green-base">0</p>/
          <p className="text-red-base">0</p>)
        </div>
      </div>
      {/* Khối lượng */}
      <div className="flex flex-row items-start">
        <span className="font-medium w-2/5 md:w-1/3 text-xs sm:text-sm text-content-tertiary">
          {t("input.order-volume")}
        </span>
        <div className="flex-1">
          <InputVolume<OrderFormValues>
            name="orderVolume"
            control={control}
            error={errors.orderVolume}
            className="px-1! py-0.5!"
            rules={{
              validate: (value) => handleValidateVolume(value),
            }}
          />
        </div>
      </div>
      {/* Giá */}
      <div className="flex flex-row items-start">
        <span className="font-medium w-2/5 md:w-1/3 text-xs sm:text-sm text-content-tertiary">
          {t("input.order-price")}
        </span>
        <div className="flex-1">
          <InputPrice<OrderFormValues>
            name="orderPrice"
            control={control}
            error={errors.orderPrice}
            className="px-1! py-0.5!"
            symbol={stockCode}
            rules={{
              validate: (value) => handleValidatePrice(value),
            }}
          />
        </div>
      </div>
      {/* Giá trị */}
      <div className="flex flex-row items-start">
        <span className="font-medium w-2/5 md:w-1/3 text-content-tertiary text-xs sm:text-sm ">
          {t("order.value")}
        </span>
        {orderVolume && orderPrice ? (
          <div className="flex-1 flex flex-row justify-end">
            <p className="pr-1">
              {PRICE_TYPE.includes(orderPrice + "")
                ? ""
                : numberFormat(
                    StringToInt(orderVolume) * StringToInt(+orderPrice * 1000),
                  ) +
                  " " +
                  t("vnd")}
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>{" "}
      {/* submit */}
      <div className="flex flex-row gap-2 w-full">
        <Button
          type="button"
          className="w-1/2 h-7.5!"
          variant="success"
          onClick={onBuy}
        >
          {t("button.buy")}
        </Button>
        <Button
          type="button"
          className="w-1/2 h-7.5!"
          variant="error"
          onClick={onSell}
        >
          {t("button.sell")}
        </Button>
      </div>
    </form>
  );
}
