import { Button } from "@/components/ui/Button";
import InputField from "@/components/ui/inputs/InputField";
import InputSearchField from "@/components/ui/inputs/InputSearch";
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
    setValue,
  } = useForm();

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

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
              <div className="flex items-center justify-between px-6">
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
                className="flex flex-col gap-4 md:gap-6 px-6"
              >
                <InputSearchField
                  name="bank"
                  label={t("user.bank")}
                  registration={register("bank", {
                    required: t("validate.bank-required"),
                  })}
                  error={errors?.bank as FieldError}
                  className="h-10!"
                  placeholder={t("input.bank-placeholder")}
                  setValue={setValue}
                  required
                />

                <InputField
                  name="accountCode"
                  type="text"
                  autoComplete="off"
                  registration={register("accountCode", {
                    required: t("validate.accountCode-required"),
                  })}
                  error={errors?.accountCode as FieldError}
                  className="h-10!"
                  placeholder={t("input.accountCode-placeholder")}
                  label={t("user.account-code")}
                  required
                />

                <InputField
                  name="fullName"
                  type="text"
                  autoComplete="off"
                  registration={register("fullName", {
                    required: t("validate.fullname-required"),
                  })}
                  error={errors?.fullName as FieldError}
                  placeholder={t("input.fullname-placeholder")}
                  className="h-10!"
                  label={t("full-name")}
                  required
                />

                <div className="w-full h-px bg-border"></div>

                <div className="flex flex-row gap-2 col-span-1 px-6">
                  <Button
                    type="button"
                    variant="secondary"
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
