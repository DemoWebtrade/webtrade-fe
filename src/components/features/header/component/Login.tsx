import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginModal from "../../auth/login-modal";

export default function Login() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button className="w-24" onClick={() => setIsOpen(true)}>
        {t("login")}
      </Button>
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
