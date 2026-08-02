import { Button } from "@/components/ui/Button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { getProfileThunk } from "@/store/modules/auth/api";
import {
  selectIsLogin,
  selectIsOpenProfile,
  selectProfile,
  selectToken,
} from "@/store/modules/auth/selector";
import {
  logout,
  setIsLogin,
  setIsOpenProfile,
} from "@/store/modules/auth/slice";
import { AnimatePresence, motion } from "framer-motion";
import { UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import LoginModal from "../../auth/login-modal";

export default function Login() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const token = useAppSelector(selectToken);
  const isLogin = useAppSelector(selectIsLogin);
  const profile = useAppSelector(selectProfile);
  const isOpenProfile = useAppSelector(selectIsOpenProfile);

  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const refInfo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!token) return;

    dispatch(getProfileThunk());
  }, [token, dispatch]);

  const handleLogout = () => {
    setIsOpenInfo(false);
    dispatch(logout());
  };

  const modalOpen = !token && isLogin;

  const handleClickUser = () => {
    setIsOpenInfo((prev) => (isOpenProfile ? false : !prev));
    dispatch(setIsOpenProfile(false));
  };

  const handleClickProfile = () => {
    dispatch(setIsOpenProfile(true));
    setIsOpenInfo(false);
  };

  useClickOutside(refInfo, () => {
    setIsOpenInfo(false);
  });

  return (
    <>
      {token ? (
        <div
          ref={refInfo}
          className="p-1 rounded-md bg-purple-base/30 hover:bg-purple-hover/30 relative"
        >
          <div
            className="flex flex-row items-center gap-1 cursor-pointer"
            onClick={handleClickUser}
          >
            <UserRound className="size-3.5" />
            <span className="text-sm flex flex-col items-center md:gap-1 md:flex-row">
              <span className="whitespace-nowrap text-content-secondary">
                {t("user.account")}
              </span>
              <span>{profile?.tradingAccounts?.[0]?.accountNumber}</span>
            </span>
          </div>

          <AnimatePresence>
            {isOpenInfo && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[calc(100%+4px)] right-0 z-10 bg-bg-blue shadow-md px-4 py-3 rounded-md w-60"
              >
                <h1 className="text-base font-bold">
                  {t("user.welcome")}, {profile?.fullName}
                </h1>
                <div className="flex flex-col gap-1 text-sm mt-2">
                  <div
                    className="p-2 md:p-3 rounded-md hover:bg-bg-button cursor-pointer"
                    onClick={handleClickProfile}
                  >
                    {t("user.title-infor")}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="p-2 md:p-3">{t("user.secure-setting")}</h1>
                    <div className="p-2 md:p-3 rounded-md hover:bg-bg-button cursor-pointer">
                      <div className="ml-4"> {t("user.change-pass")}</div>
                    </div>
                  </div>
                  <div
                    className="p-2 md:p-3 rounded-md hover:bg-bg-button cursor-pointer"
                    onClick={handleLogout}
                  >
                    {t("logout")}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <>
          <div data-tour="prop-11">
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
