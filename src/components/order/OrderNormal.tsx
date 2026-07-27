import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputSearchStockSmartField } from "../ui/inputs/InputSearchStockSmartField";
import SelectField from "../ui/inputs/SelectField";

export default function OrderNormal() {
  const { t } = useTranslation();

  const { handleSubmit, register } = useForm();

  const onSubmit = () => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-1 md:p-2 text-sm flex flex-col gap-1"
    >
      <div className="flex flex-row items-center">
        <div className="w-1/3">
          <InputSearchStockSmartField
            name="stockCode"
            defaultValue="ACB"
            className="text-base! px-1!"
            registration={register("stockCode")}
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
              <span>Đóng cửa</span>
              <span>
                <span className="text-content-tertiary">Tổng KL</span>{" "}
                16,500,400
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tài khoản đặt lệnh */}
      <div className="flex flex-row items-center">
        <span className="font-medium w-1/3">Tài khoản đặt lệnh</span>

        <div className="flex-1">
          <SelectField
            name="gender"
            options={
              [
                // { label: t("male"), value: "MALE" },
                // { label: t("female"), value: "FEMALE" },
              ]
            }
            className="h-4!"
          />{" "}
        </div>
      </div>

      {/* Sức mua */}
      <div className="flex flex-row items-center">
        <div className="font-medium w-1/3 flex flex-row items-center gap-1">
          <span>Sức mua</span>
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
          <p>0 VNĐ </p>(<p className="text-green-base">0</p>/
          <p className="text-red-base">0</p>)
        </div>
      </div>
    </form>
  );
}
