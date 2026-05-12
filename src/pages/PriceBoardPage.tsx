import PriceBoard from "@/features/price-board";
import { usePageTitle } from "@/hooks/usePageTitle";
import { MarketSocket } from "@/services/socket/market";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function PriceBoardPage() {
  const { t } = useTranslation();

  usePageTitle(t("price-board"));

  useEffect(() => {
    MarketSocket.connect();

    return () => {
      MarketSocket.close();
    };
  }, []);

  return (
    <>
      <PriceBoard />
    </>
  );
}
