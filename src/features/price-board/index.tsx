import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import IndexInfor from "./index-infor";
import MenuBoard from "./menu-board";
import SettingBoard from "./setting";
import Table from "./table";

export default function PriceBoard() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col gap-3 relative">
      <div className="h-40 w-full">
        <IndexInfor />
      </div>

      <div className="h-10 w-full flex flex-row items-center justify-between md:gap-4 gap-2">
        <MenuBoard />

        <div className="flex flex-row items-center justify-between md:gap-4 gap-2">
          <SettingBoard />

          {/* Đặt lệnh */}
          <div data-tour="prop-9">
            {" "}
            <Button className="w-auto whitespace-nowrap" variant="success">
              {t("order")}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <Table />
      </div>
    </div>
  );
}
