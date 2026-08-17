import { usePageTitle } from "@/hooks/usePageTitle";
import { useTranslation } from "react-i18next";

export default function OrderPage() {
  const { t } = useTranslation();

  usePageTitle(t("menu.order"));

  return <div>OrderPage</div>;
}
