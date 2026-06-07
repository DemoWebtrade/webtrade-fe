import { Button } from "@/components/ui/Button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { selectToken } from "@/store/modules/auth/selector";
import { logout } from "@/store/modules/auth/slice";
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

  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const refInfo = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    setIsOpenInfo(false);
    dispatch(logout());
  };

  const modalOpen = isOpenLogin && !token;

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
          <span className="text-xs flex flex-col md:gap-1 md:flex-row">
            <span>Tài khoản</span>
            <span>C000365</span>
          </span>

          <AnimatePresence>
            {isOpenInfo && (
              <div className="absolute top-7 right-0 z-10 bg-bg-tertiary shadow-md px-4 py-3 rounded-md w-60">
                <h1 className="text-base font-bold">Xin chào, Lê Hồng Chiến</h1>
                <div className="flex flex-col gap-1 text-sm mt-2">
                  <div className="px-2 py-1 rounded-md hover:bg-bg-button">
                    Thông tin khách hàng
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <h1 className="px-2 py-1">Cài đặt bảo mật</h1>
                    <div className="px-2 py-1 rounded-md hover:bg-bg-button">
                      <div className="ml-4">Thay đổi mật khẩu</div>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-md hover:bg-bg-button">
                    Thông tin tài khoản
                  </div>
                  <div
                    className="px-2 py-1 rounded-md hover:bg-bg-button"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <>
          <div data-tour="prop-10">
            <Button onClick={() => setIsOpenLogin(true)}>{t("login")}</Button>
          </div>
          <LoginModal
            isOpen={modalOpen}
            onClose={() => setIsOpenLogin(false)}
          />
        </>
      )}
    </>
  );
}
