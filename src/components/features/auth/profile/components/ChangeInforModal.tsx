import { Button } from "@/components/ui/Button";
import InputField from "@/components/ui/inputs/InputField";
import { backdropVariants, modalVariants } from "@/configs";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { updateProfileThunk } from "@/store/modules/auth/api";
import {
  selectLoadingUpdateProfile,
  selectProfile,
} from "@/store/modules/auth/selector";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function ChangeInforModal({
  isOpen,
  type,
  onClose,
}: {
  isOpen: boolean;
  type: string;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const loading = useAppSelector(selectLoadingUpdateProfile);
  const profile = useAppSelector(selectProfile);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (profile && isOpen && type) {
      const { email, phone, address } = profile;

      const fieldMap: Record<string, object> = {
        EMAIL: { email },
        PHONE: { phone },
        ADDRESS: { address },
      };
      reset(fieldMap[type]);
    }
  }, [profile, reset, type, isOpen]);

  const onSubmit = async (data: {
    email?: string;
    phone?: string;
    address?: string;
  }) => {
    const { email, phone, address } = data;
    try {
      const fieldMap: Record<string, object> = {
        EMAIL: { email },
        PHONE: { phone },
        ADDRESS: { address },
      };

      await dispatch(updateProfileThunk(fieldMap[type])).unwrap();
      toast.success(t("toast.change-info-success"));

      onClose();
    } catch (error) {
      toast.error(error as string);
    }
  };

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
          <div className="fixed inset-0 z-9999999 flex items-center justify-center">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-6 py-6 max-w-[90%] w-full md:w-120 rounded-lg shadow-2xl overflow-hidden border border-border bg-bg-primary"
            >
              {/* Header */}
              <div className="flex items-baseline justify-between px-6">
                {type === "EMAIL" && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-medium">
                      {t("user.email-change")}
                    </h2>
                    <span className="text-sm text-content-secondary">
                      {t("user.pe-change-title")}
                    </span>
                  </div>
                )}
                {type === "PHONE" && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-medium">
                      {t("user.phone-change")}
                    </h2>
                    <span className="text-sm text-content-secondary">
                      {t("user.pe-change-title")}
                    </span>
                  </div>
                )}
                {type === "ADDRESS" && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-medium">
                      {t("user.address-change")}
                    </h2>
                    <span className="text-sm text-content-secondary">
                      {t("user.address-change-title")}
                    </span>
                  </div>
                )}

                <div className="text-content-primary" onClick={onClose}>
                  <X size={20} />
                </div>
              </div>

              <div className="w-full h-px bg-border"></div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 md:gap-6 px-6"
              >
                {type === "EMAIL" && (
                  <InputField
                    name="email"
                    type="text"
                    autoComplete="off"
                    registration={register("email", {
                      required: t("validate.email-required"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("validate.email-incorrect"),
                      },
                    })}
                    error={errors?.email as FieldError}
                    className="h-10!"
                    placeholder={t("input.email-placeholder")}
                    label={t("Email")}
                    required
                  />
                )}
                {type === "PHONE" && (
                  <InputField
                    name="phone"
                    type="text"
                    autoComplete="off"
                    registration={register("phone", {
                      required: t("validate.phone-required"),
                      pattern: {
                        value: /(0[3|5|7|8|9])+([0-9]{8})\b/g,
                        message: t("validate.phone-incorrect"),
                      },
                      minLength: {
                        value: 10,
                        message: t("validate.phone-incorrect"),
                      },
                      maxLength: {
                        value: 10,
                        message: t("validate.phone-incorrect"),
                      },
                    })}
                    error={errors?.phone as FieldError}
                    placeholder={t("input.phone-placeholder")}
                    className="h-10!"
                    label={t("phone-number")}
                    required
                  />
                )}
                {type === "ADDRESS" && (
                  <InputField
                    name="address"
                    type="text"
                    autoComplete="off"
                    registration={register("address", {
                      required: t("validate.address-required"),
                    })}
                    error={errors?.address as FieldError}
                    className="h-10!"
                    placeholder={t("input.address-placeholder")}
                    label={t("address")}
                    required
                  />
                )}

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
                    isLoading={loading}
                    disabled={loading}
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
