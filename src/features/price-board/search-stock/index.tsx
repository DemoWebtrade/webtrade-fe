import { InputSearchStockField } from "@/components/ui/inputs/InputSearchStockField";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SearchStockForm {
  stock: string;
}

export default function SearchStock() {
  const { t } = useTranslation();

  const { handleSubmit, register, setValue } = useForm<SearchStockForm>();

  const onSubmit = (data: SearchStockForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputSearchStockField
        name="stock"
        placeholder={t("Tìm kiếm CK")}
        registration={register("stock")}
        className="h-8! w-30! min-[380px]:w-40! md:w-60!"
        setValue={setValue}
      />
    </form>
  );
}
