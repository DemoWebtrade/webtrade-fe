import { useTranslation } from "react-i18next";

export default function BenAccount() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2 md:gap-3 md:mt-3 mt-1">
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="text-base p-2 md:p-3 bg-purple-base/20 flex items-center justify-between">
          <span>{t("user.account-lk")}</span>
          <div className="font-medium text-green-500 hover:text-green-hover">
            {t("user.account-add")}
          </div>
        </div>
      </div>
    </div>
  );
}
