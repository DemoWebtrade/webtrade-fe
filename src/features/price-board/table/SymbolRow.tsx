import { LIST_STOCKS } from "@/configs";
import type { LanguageKey } from "@/types";
import type { CustomCellRendererProps } from "ag-grid-react";
import { useTranslation } from "react-i18next";

export default function SymbolRow(props: CustomCellRendererProps) {
  const { i18n } = useTranslation();

  const symbol = props.value as string;

  const currentLang = (i18n.resolvedLanguage ||
    i18n.language ||
    "vi") as LanguageKey;

  const symbolInfor = LIST_STOCKS?.find((s) => s?.code === symbol);

  return (
    <div
      data-tooltip-id="global-tooltip"
      data-tooltip-content={`${symbolInfor?.exchange?.toLocaleUpperCase()} - ${currentLang === "vi" ? symbolInfor?.clientName : symbolInfor?.clientNameEn}`}
      data-tooltip-place="right"
    >
      {symbol}
    </div>
  );
}
