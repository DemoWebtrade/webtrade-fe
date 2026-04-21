import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginModal from "../../auth/login-modal";

export default function Login() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div data-tour="prop-10">
        <Button onClick={() => setIsOpen(true)}>{t("login")}</Button>
      </div>
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
