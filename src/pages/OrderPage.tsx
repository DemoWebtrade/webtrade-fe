import Order from "@/features/order";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useTranslation } from "react-i18next";

export default function OrderPage() {
  const { t } = useTranslation();

  usePageTitle(t("menu.order"));

  return (
    <>
      <Order />
    </>
  );
}
