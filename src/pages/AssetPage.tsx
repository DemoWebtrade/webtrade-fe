import { usePageTitle } from "@/hooks/usePageTitle";
import { useTranslation } from "react-i18next";

export default function AssetPage() {
  const { t } = useTranslation();

  usePageTitle(t("menu.asset"));

  return <div>Asset Page</div>;
}
