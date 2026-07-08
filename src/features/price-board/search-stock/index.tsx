import { InputSearchStockField } from "@/components/ui/inputs/InputSearchStockField";
import { useAppDispatch } from "@/store/hook";
import { setStockSearch } from "@/store/modules/priceboard/slice";
import type { StockListItem } from "@/types";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface SearchStockForm {
  stock: string;
}

export default function SearchStock() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { register } = useForm<SearchStockForm>();

  const handleStockSelect = (data: StockListItem) => {
    if (!data?.code) {
      toast.error("Mã chứng khoán không hợp lệ");

      return;
    }

    dispatch(setStockSearch(data.code));
  };

  return (
    <form>
      <InputSearchStockField
        name="stock"
        placeholder={t("Tìm kiếm CK")}
        registration={register("stock")}
        className="h-8! w-30! min-[380px]:w-40! md:w-60!"
        onStockSelect={handleStockSelect}
        isClearValue={true}
      />
    </form>
  );
}
