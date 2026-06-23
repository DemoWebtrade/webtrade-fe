import { HEADER_TABLE_BASE_CONFIG } from "@/configs";
import PriceBoard from "@/features/price-board";
import { usePageTitle } from "@/hooks/usePageTitle";
import { MarketSocket } from "@/services/socket/market";
import { useAppDispatch } from "@/store/hook";
import { setHeaderTableBaseConfig } from "@/store/modules/priceboard/slice";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function PriceBoardPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  usePageTitle(t("price-board"));

  const handleGetConfigHeader = () => {
    const isCheck = localStorage.getItem("headerTableBaseConfig");

    if (isCheck) return;
    dispatch(setHeaderTableBaseConfig(HEADER_TABLE_BASE_CONFIG));
  };

  useEffect(() => {
    handleGetConfigHeader();
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
