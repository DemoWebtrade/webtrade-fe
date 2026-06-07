import { Button } from "@/components/ui/Button";
import InputField from "@/components/ui/inputs/InputField";
import { backdropVariants, modalVariants } from "@/configs/modal";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { loginThunk } from "@/store/modules/auth/api";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LoginForm {
  username: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.auth.loading.login);
  const user = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginForm>();

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

  useEffect(() => {
    if (user) {
      handleClose();
    }
  }, [user, handleClose]);

  const handleLogin = async (data: { username: string; password: string }) => {
    if (loading) return;
    try {
      await dispatch(
        loginThunk({ username: data.username, password: data.password }),
      ).unwrap();
    } catch (error) {
      toast.error(error as string);
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
                  {isSubmitting || loading ? (
                    <div className="flex items-center justify-center gap-2.5">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t("loading")}</span>
                    </div>
                  ) : (
                    t("login")
                  )}
                </Button>

                <div className="text-center text-sm text-gray-500">
                  {t("no-account")}{" "}
                  <Link
                    className="text-blue-600 hover:underline font-medium"
                    to={"/register"}
                  >
                    {t("now-register")}
                  </Link>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
