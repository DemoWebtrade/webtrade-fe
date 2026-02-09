import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginModal from "../../auth/login-modal";

export default function Login() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = async (data: { email: string; password: string }) => {
    console.log("Đăng nhập với:", data);

    // Tự động đóng modal sau 1.5s (hoặc khi thành công)
    setTimeout(() => setIsOpen(false), 1500);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{t("login")}</Button>
      <LoginModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleLogin}
      />
    </>
  );
}
