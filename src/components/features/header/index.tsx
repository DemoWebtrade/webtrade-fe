import Logo from "@/assets/imgs/logo/lhc_logo.png";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import ThemeSetting from "./component/ThemeSetting";

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between w-full h-full bg-bg-secondary pr-2 md:pr-4">
      <img
        src={Logo}
        alt="logo-website"
        className="md:h-14 md:w-14 w-12 h-12"
      />

      {/* Chức năng */}
      <div className="flex flex-row items-center justify-center gap-2 md:gap-4">
        {/* Đổi màu */}
        <ThemeSetting />

        {/* login */}
        <Button>{t("login")}</Button>
      </div>
    </header>
  );
}
