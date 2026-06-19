import { Button } from "@/components/ui/Button";
import InputField from "@/components/ui/inputs/InputField";
import { backdropVariants, modalVariants } from "@/configs";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function AddBenAccountModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const onSubmit = () => {};

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-6 py-6 max-w-[90%] w-full md:w-120 rounded-lg shadow-2xl overflow-hidden border border-border bg-bg-primary"
            >
              {/* Header */}
              <div className="flex items-baseline justify-between px-6">
                <h1 className="text-xl font-medium">
                  {t("user.account-ben-add")}
                </h1>
                <div
                  className="text-content-primary cursor-pointer"
                  onClick={onClose}
                >
                  <X size={20} />
                </div>
              </div>

              <div className="w-full h-px bg-border"></div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 px-6"
              >
                <div>
                  <label htmlFor="bank">{t("user.bank")}</label>
                  <InputField
                    name="bank"
                    type="text"
                    autoComplete="off"
                    registration={register("bank", {
                      required: t("validate.bank-required"),
                    })}
                    error={errors?.bank as FieldError}
                    className="h-8! md:h-10!"
                    placeholder={t("input.bank-placeholder")}
                  />
                </div>
                <div>
                  <label htmlFor="accountCode">{t("user.account-code")}</label>
                  <InputField
                    name="accountCode"
                    type="text"
                    autoComplete="off"
                    registration={register("accountCode", {
                      required: t("validate.accountCode-required"),
                    })}
                    error={errors?.accountCode as FieldError}
                    className="h-8! md:h-10!"
                    placeholder={t("input.accountCode-placeholder")}
                  />
                </div>
                <div>
                  <label htmlFor="fullName">{t("full-name")}</label>
                  <InputField
                    name="fullName"
                    type="text"
                    autoComplete="off"
                    registration={register("fullName", {
                      required: t("validate.fullname-required"),
                    })}
                    error={errors?.fullName as FieldError}
                    placeholder={t("input.fullname-placeholder")}
                    className="h-8! md:h-10!"
                  />
                </div>

                <div className="w-full h-px bg-border"></div>

                <div className="flex flex-row gap-2 col-span-1 px-6">
                  <Button
                    type="button"
                    variant="none"
                    onClick={onClose}
                    className="w-1/2"
                  >
                    {t("button.cancel")}
                  </Button>{" "}
                  <Button
                    type="submit"
                    className="w-1/2"
                    // isLoading={loading}
                    // disabled={loading}
                  >
                    {t("button.save-change")}
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
