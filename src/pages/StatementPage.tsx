import Statement from "@/features/statement";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useTranslation } from "react-i18next";

export default function StatementPage() {
  const { t } = useTranslation();

  usePageTitle(t("menu.statement"));

  return (
    <>
      <Statement />
    </>
  );
}
