import PriceBoard from "@/features/price-board";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useTranslation } from "react-i18next";

export default function PriceBoardPage() {
  const { t } = useTranslation();

  usePageTitle(t("price-board"));

  return (
    <>
      <PriceBoard />
    </>
  );
}
