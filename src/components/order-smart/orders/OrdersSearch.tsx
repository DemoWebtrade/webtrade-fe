import { Button } from "@/components/ui/Button";
import { InputSearchStockMiniField } from "@/components/ui/inputs/InputSearchStockMiniField";
import SelectField from "@/components/ui/inputs/SelectField";
import { FileDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function OrdersSearch() {
  const { t } = useTranslation();

  const { control } = useForm();

  return (
    <form className="px-0.5 pb-2 grid grid-cols-4 gap-1 place-items-center">
      <SelectField
        name="side"
        placeholder={t("select.sell-buy")}
        options={[
          {
            label: "select.sell-buy",
            value: "ALL",
          },
          {
            label: "select.buy",
            value: "Mua",
          },
          {
            label: "select.sell",
            value: "Bán",
          },
        ]}
        className="text-xs! px-1! py-0.5! col-span-1"
      />

      <SelectField
        name="status"
        placeholder={t("select.all")}
        options={[
          {
            label: "select.all",
            value: "ALL",
          },
          {
            label: "select.pending-order",
            value: "Chờ khớp",
          },
          {
            label: "select.matched-order",
            value: "Khớp",
          },
          {
            label: "select.cancelled-order",
            value: "Đã hủy",
          },
          {
            label: "select.pendingprocess-order",
            value: "Đang xử lý",
          },
          {
            label: "select.reject-order",
            value: "Từ chối",
          },
        ]}
        className="text-xs! px-1! py-0.5! col-span-1"
      />

      <div className="col-span-1">
        <Controller
          name="stockCode"
          control={control}
          render={({ field }) => (
            <InputSearchStockMiniField
              name="stockCode"
              value={field.value}
              onStockSelect={(stock) => {
                field.onChange(stock.code);
              }}
              className="text-xs! px-1! py-0.75!"
            />
          )}
        />
      </div>

      <div className="col-span-1 flex items-center justify-end w-full">
        <Button
          type="button"
          variant="link"
          className="flex flex-row gap-1 items-center justify-center cursor-pointer mt-1"
        >
          <FileDown className="md:size-4 size-3" />
          <span className="text-xs mt-0.5">{t("button.export-data")}</span>
        </Button>
      </div>
    </form>
  );
}
