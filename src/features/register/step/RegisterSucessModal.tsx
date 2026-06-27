import { Button } from "@/components/ui/Button";
import { backdropVariants, modalVariants } from "@/configs";
import { useAppDispatch } from "@/store/hook";
import { setIsLogin } from "@/store/modules/auth/slice";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function RegisterSucessModal({ isOpen }: { isOpen: boolean }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.4 },
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    navigate("/");
    dispatch(setIsLogin(true));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/65 backdrop-blur-sm z-40"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-9999999 flex items-center justify-center">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-6 py-6 max-w-[90%] w-full md:w-100 rounded-lg shadow-2xl overflow-hidden border border-border bg-bg-primary"
            >
              <div className="flex flex-col items-center justify-center gap-6 px-6 md:px-12">
                <div className="size-14 relative grid place-items-center rounded-full">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-hover opacity-25"></span>
                  <div className="size-10 bg-green-base relative grid place-items-center rounded-full">
                    <Check className="relative inline-flex text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center text-center">
                  <h1 className="text-xl font-bold">
                    {t("register.account_activated_title")}
                  </h1>
                  <span className="text-sm text-muted-foreground">
                    {t("register.account_activated_desc_prefix")}{" "}
                    <span className="font-bold text-purple-base">
                      LHC Web Trade
                    </span>{" "}
                    {t("register.account_activated_desc_suffix")}
                  </span>
                </div>
                <Button
                  className="w-full"
                  variant="success"
                  onClick={handleClose}
                >
                  {t("button.start_trading")}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
