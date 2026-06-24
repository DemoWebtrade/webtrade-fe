import { Button } from "@/components/ui/Button";
import InputCheckbox from "@/components/ui/inputs/InputCheckbox";
import { backdropVariants, modalVariants } from "@/configs/modal";
import { useAppSelector } from "@/store/hook";
import { selectHeaderTableBaseConfig } from "@/store/modules/priceboard/selector";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCw, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingModal({ isOpen, onClose }: SettingModalProps) {
  const { t } = useTranslation();

  const headerTableBaseConfig = useAppSelector(selectHeaderTableBaseConfig);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  const onSubmit = () => {};

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
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-6 py-6 max-w-[90%] w-full md:w-180 rounded-lg shadow-2xl overflow-hidden border border-border bg-bg-primary"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6">
                <h2 className="text-xl font-medium">
                  {t("Tùy chỉnh hiển thị")}
                </h2>

                <div className="text-content-primary" onClick={handleClose}>
                  <X size={20} />
                </div>
              </div>

              <div className="w-full h-px bg-border"></div>

              <form
                className="flex flex-col gap-4 md:gap-6 px-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-3 gap-2">
                  {headerTableBaseConfig?.length > 0 &&
                    headerTableBaseConfig?.map((item, index) => (
                      <div key={index}>
                        <InputCheckbox
                          name={item?.id}
                          error={errors?.test as FieldError}
                          label={t(item?.label)}
                        />
                      </div>
                    ))}
                </div>

                <div className="w-full h-px bg-border"></div>

                <div className="flex flex-row items-center justify-center w-full gap-2 px-6">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                    className="w-1/3 md:w-40"
                  >
                    {t("button.close")}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-1/3 md:w-40"
                  >
                    <RotateCw size={16} className="mr-2" />
                    {t("button.reset")}
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/3 md:w-40"
                    // isLoading={loading}
                    // disabled={loading}
                  >
                    {t("button.save")}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
