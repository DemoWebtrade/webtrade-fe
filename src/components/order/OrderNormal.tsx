import { LIST_STOCKS, MARKET_TYPE, PRICE_TYPE } from "@/configs";
import { useAppSelector } from "@/store/hook";
import { selectListAccount } from "@/store/modules/auth/selector";
import { numberFormat, StringToInt } from "@/utils";
import { Info } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";
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
};

export default function OrderNormal() {
  const { t } = useTranslation();

  const listAccount = useAppSelector(selectListAccount);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<OrderFormValues>();

  const stockCode = useWatch({
    control,
    name: "stockCode",
  });

  const stock = LIST_STOCKS.find((s) => s.code === stockCode);

  const orderPrice = useWatch({
    control,
    name: "orderPrice",
  });
  const orderVolume = useWatch({
    control,
    name: "orderVolume",
  });

  const handleValidateVolume = (volume: string | number | null) => {
    if (!volume) {
      return "Vui lòng nhập khối lượng";
    }

    const numericVolume = StringToInt(volume);

    if (
      !numericVolume ||
      numericVolume <= 0 ||
      (numericVolume > 100 && numericVolume % 100 !== 0)
    ) {
      return "Khối lượng không hợp lệ";
    }

    if (numericVolume > 500_000 && stock?.exchange?.toUpperCase() === "HOSE") {
      return "Khối lượng không hợp lệ";
    }
  };

  const handleValidatePrice = (price: number | string | null) => {
    if (!price) {
      return "Vui lòng nhập giá";
    }

    // validate theo sàn
    const market = stock?.exchange?.toUpperCase();

    if (typeof price === "string" && price && PRICE_TYPE?.includes(price)) {
      if (market && !MARKET_TYPE?.[market]?.includes(price)) {
        return market === "HOSE"
          ? "HOSE không đặt giá MOK/MAK/PLO"
          : market === "HNX"
            ? "HNX không đặt giá MP"
            : market === "UPCOM"
              ? "UPCOM không đặt giá thị trường"
              : "Giá đặt không hợp lệ";
      }

      return;
    }

    const numericPrice = StringToInt(price);

    if (!numericPrice || numericPrice <= 0) {
      return "Giá không hợp lệ";
    }

    const priceInVnd = Math.round(numericPrice * 1000);
    const step = numericPrice < 10 ? 10 : numericPrice < 50 ? 50 : 100;

    if (market === "HOSE") {
      if (Math.round(priceInVnd % step) !== 0) {
        return "Giá đặt không hợp lệ";
      }
    }

    if (market === "HNX") {
      if (Math.round(priceInVnd % 100) !== 0) {
        return "Giá đặt không hợp lệ";
      }
    }
  };

  const onBuy = handleSubmit((data) => {
    console.log(data);
  });

  const onSell = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="p-1 md:p-2 text-sm flex flex-col gap-2">
      <div className="flex flex-row items-center">
        <div className="w-1/3">
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
                  });
                }}
              />
            )}
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-row items-center justify-between text-sm">
            {" "}
            {/* Thông tin mã chứng khoán */}
            <div className="flex flex-col items-start w-1/2">
              <div className="flex flex-row gap-1">
                <span className="font-medium">22.00</span>
                <span>(-0.88 -3.51%)</span>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <span className="text-purple-base">24.35</span>
                <span className="text-yellow-base">22.80</span>
                <span className="text-blue-base">21.25</span>
              </div>
            </div>
            <div className="flex flex-col items-end w-1/2 ">
              <span>{t("status.closed")}</span>
              <span>
                <span className="text-content-tertiary">
                  {t("order.value-total")}
                </span>{" "}
                16,500,400
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Tài khoản đặt lệnh */}
      <div className="flex flex-row items-start">
        <span className="font-medium w-1/3 text-sm text-content-tertiary">
          {t("input.order-account")}
        </span>

        <div className="flex-1">
          <SelectField
            name="gender"
            options={listAccount?.map((item) => ({
              label: item.accountNumber,
              value: item.accountNumber,
            }))}
            className="px-1! py-0.5!"
          />{" "}
        </div>
      </div>
      {/* Sức mua */}
      <div className="flex flex-row items-start">
        <div className="font-medium w-1/3 text-sm text-content-tertiary flex flex-wrap items-center gap-1">
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
        <span className="font-medium w-1/3 text-sm text-content-tertiary">
          {t("input.order-volume")}
        </span>
        <div className="flex-1">
          <InputVolume<OrderFormValues>
            name="orderVolume"
            control={control}
            error={errors.orderVolume}
            className="px-1! py-0.5!"
            rules={{
              required: "Vui lòng nhập khối lượng",
              validate: (value) => handleValidateVolume(value),
            }}
          />
        </div>
      </div>
      {/* Giá */}
      <div className="flex flex-row items-start">
        <span className="font-medium w-1/3 text-sm text-content-tertiary">
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
              required: "Vui lòng nhập giá đặt",
              validate: (value) => handleValidatePrice(value),
            }}
          />
        </div>
      </div>
      {/* Giá trị */}
      <div className="flex flex-row items-start">
        <span className="font-medium w-1/3 text-content-tertiary text-sm ">
          {t("order.value")}
        </span>
        {orderVolume && orderPrice ? (
          <div className="flex-1 flex flex-row justify-end">
            <p className="pr-1">
              {PRICE_TYPE.includes(orderPrice + "")
                ? ""
                : numberFormat(
                    StringToInt(orderVolume) * StringToInt(+orderPrice * 1000),
                  ) + " VNĐ"}
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
