import { Button } from "@/components/ui/Button";
import InputField from "@/components/ui/inputs/InputField";
import { backdropVariants, modalVariants } from "@/configs/modal";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { loginThunk } from "@/store/modules/auth/api";
import { selectRegisterData } from "@/store/modules/auth/selector";
import { setRegisterData } from "@/store/modules/auth/slice";
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
  identifier: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.auth.loading.login);
  const registerData = useAppSelector(selectRegisterData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>();

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  useEffect(() => {
    if (registerData) {
      reset({
        identifier: registerData.phone ?? "",
      });
    }
  }, [registerData, reset]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  const handleLogin = async (data: {
    identifier: string;
    password: string;
  }) => {
    if (loading) return;
    try {
      await dispatch(
        loginThunk({ identifier: data.identifier, password: data.password }),
      ).unwrap();
      handleClose();
      dispatch(setRegisterData(null));
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
                <InputField
                  label={t("username")}
                  name="identifier"
                  autoComplete="current-identifier"
                  registration={register("identifier", {
                    required: t("validate.identifier-required"),
                  })}
                  error={errors?.identifier as FieldError}
                  required
                />

                <InputField
                  name="password"
                  registration={register("password", {
                    required: t("validate.password-required"),
                  })}
                  type="password"
                  autoComplete="current-password"
                  error={errors?.password as FieldError}
                  label={t("password")}
                  required
                />

                <Button
                  type="submit"
                  disabled={loading}
                  variant={"default"}
                  className="w-full"
                  isLoading={loading}
                >
                  {t("login")}
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
