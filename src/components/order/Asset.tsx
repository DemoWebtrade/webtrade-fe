import { useTranslation } from "react-i18next";

export default function Asset() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col items-center text-sm text-content-tertiary overflow-auto">
      <div className="w-full h-full flex flex-row items-center justify-between px-2 py-2.5">
        <span>{t("asset.total")}</span>
        <span className="text-content-primary">10,880,212</span>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-between px-2 py-2.5 bg-bg-tertiary">
        <span>{t("asset.buy-power")}</span>
        <span className="text-content-primary">860,186</span>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-between px-2 py-2.5">
        <span>{t("asset.net-asset")}</span>
        <span className="text-content-primary">10,880,186</span>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-between px-2 py-2.5 bg-bg-tertiary">
        <span>{t("asset.cash-balance")}</span>
        <span className="text-content-primary">860,212</span>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-between px-2 py-2.5">
        <span>{t("asset.value-list-sec")}</span>
        <span className="text-content-primary">10,020,000</span>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-between px-2 py-2.5 bg-bg-tertiary">
        <span>{t("asset.withdraw-amount")}</span>
        <span className="text-content-primary">860,186</span>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-between px-2 py-2.5">
        <span>{t("asset.wiliability")}</span>
        <span className="text-content-primary">26</span>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-between px-2 py-2.5 bg-bg-tertiary">
        <span>{t("asset.net-sell-value")}</span>
        <span className="text-content-primary">26</span>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-between px-2 py-2.5">
        <span>{t("asset.advanced-cash")}</span>
        <span className="text-content-primary">26</span>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-between px-2 py-2.5 bg-bg-tertiary">
        <span>{t("asset.right-sub")}</span>
        <span className="text-content-primary">26</span>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-between px-2 py-2.5">
        <span>{t("asset.cash-dividend")}</span>
        <span className="text-content-primary">26</span>
      </div>
    </div>
  );
}
