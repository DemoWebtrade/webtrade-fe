import { Button } from "@/components/ui/Button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { selectIsLogin, selectToken } from "@/store/modules/auth/selector";
import { logout, setIsLogin } from "@/store/modules/auth/slice";
import { AnimatePresence } from "framer-motion";
import { UserRound } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import LoginModal from "../../auth/login-modal";

export default function Login() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const token = useAppSelector(selectToken);
  const isLogin = useAppSelector(selectIsLogin);

  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const refInfo = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    setIsOpenInfo(false);
    dispatch(logout());
  };

  const modalOpen = !token && isLogin;

  useClickOutside(refInfo, () => setIsOpenInfo(false));

  return (
    <>
      {token ? (
        <div
          ref={refInfo}
          className="p-1 rounded-md flex flex-row items-center gap-1 bg-purple-base/30 hover:bg-purple-hover/30 cursor-pointer relative"
          onClick={() => setIsOpenInfo(!isOpenInfo)}
        >
          <UserRound className="size-3.5" />
          <span className="text-sm flex flex-col items-center md:gap-1 md:flex-row">
            <span className="whitespace-nowrap">{t("user.account")}</span>
            <span>C000365</span>
          </span>

          <AnimatePresence>
            {isOpenInfo && (
              <div className="absolute top-7 right-0 z-10 bg-bg-tertiary shadow-md px-4 py-3 rounded-md w-60">
                <h1 className="text-base font-bold">
                  {t("user.welcome")}, Lê Hồng Chiến
                </h1>
                <div className="flex flex-col gap-1 text-sm mt-2">
                  <div className="p-2 md:p-3 rounded-md hover:bg-bg-button">
                    {t("user.title-infor")}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="p-2 md:p-3">{t("user.secure-setting")}</h1>
                    <div className="p-2 md:p-3 rounded-md hover:bg-bg-button">
                      <div className="ml-4"> {t("user.change-pass")}</div>
                    </div>
                  </div>
                  <div className="p-2 md:p-3 rounded-md hover:bg-bg-button">
                    {t("user.infor")}
                  </div>
                  <div
                    className="p-2 md:p-3 rounded-md hover:bg-bg-button"
                    onClick={handleLogout}
                  >
                    {t("logout")}
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <>
          <div data-tour="prop-10">
            <Button onClick={() => dispatch(setIsLogin(true))}>
              {t("login")}
            </Button>
          </div>
          <LoginModal
            isOpen={modalOpen}
            onClose={() => dispatch(setIsLogin(false))}
          />
        </>
      )}
    </>
  );
}
