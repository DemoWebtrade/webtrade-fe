import { PRICE_TYPE } from "@/configs";
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
  orderPrice: string;
  orderVolume: string;
};

export default function OrderNormal() {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrderFormValues>({
    defaultValues: {
      stockCode: "ACB",
    },
  });

  const stockCode = useWatch({
    control,
    name: "stockCode",
  });
  const orderPrice = useWatch({
    control,
    name: "orderPrice",
  });
  const orderVolume = useWatch({
    control,
    name: "orderVolume",
  });

  const onSubmit = () => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-1 md:p-2 text-sm flex flex-col gap-2"
    >
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
                onStockSelect={(stock) => field.onChange(stock.code)}
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
            options={
              [
                // { label: t("male"), value: "MALE" },
                // { label: t("female"), value: "FEMALE" },
              ]
            }
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
              {PRICE_TYPE.includes(orderPrice)
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
        <Button type="button" className="w-1/2 h-7.5!" variant="success">
          {t("button.buy")}
        </Button>
        <Button type="button" className="w-1/2 h-7.5!" variant="error">
          {t("button.sell")}
        </Button>
      </div>
    </form>
  );
}
