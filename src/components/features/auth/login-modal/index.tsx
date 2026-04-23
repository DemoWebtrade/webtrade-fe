import { Button } from "@/components/ui/Button";
import InputField from "@/components/ui/inputs/InputField";
import { backdropVariants, modalVariants } from "@/configs/modal";
import apiClient from "@/services/api/apiClient";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useForm, useWatch, type FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const username = useWatch({
    control,
    name: "username",
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  const handleLogin = async () => {
    if (isSubmitting) return;
    try {
      const res = await apiClient.post("/auth/login", { username, password });

      if (res.data.code === 1) {
        await new Promise((resolve) => setTimeout(resolve, 1400));
        toast.success("This is a toast");
        onClose();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
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
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-6 py-6 max-w-[90%] w-full md:w-100 rounded-lg shadow-2xl overflow-hidden border border-border bg-bg-primary"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6">
                <h2 className="text-xl font-medium">{t("login")}</h2>

                <div className="text-content-primary" onClick={handleClose}>
                  <X size={20} />
                </div>
              </div>

              <div className="w-full h-px bg-border"></div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(handleLogin)}
                className="p-6 space-y-5"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-normal mb-2"
                  >
                    {t("username")}
                  </label>
                  <InputField
                    name="username"
                    autoComplete="current-username"
                    registration={register("username", {
                      required: t("validate.username-required"),
                    })}
                    error={errors?.username as FieldError}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-normal mb-2"
                  >
                    {t("password")}
                  </label>
                  <InputField
                    name="password"
                    registration={register("password", {
                      required: t("validate.password-required"),
                    })}
                    type="password"
                    autoComplete="current-password"
                    error={errors?.password as FieldError}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant={"default"}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2.5">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t("loading")}</span>
                    </div>
                  ) : (
                    t("login")
                  )}
                </Button>

                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  {t("no-account")}{" "}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {t("now-register")}
                  </a>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
