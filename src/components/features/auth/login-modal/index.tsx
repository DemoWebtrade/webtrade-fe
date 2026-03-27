import { Button } from "@/components/ui/Button";
import InputField from "@/components/ui/inputs/InputField";
import apiClient from "@/services/apiClient";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useForm, useWatch, type FieldError } from "react-hook-form";
import { toast } from "sonner";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.82,
    y: 60,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 280,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 40,
    transition: { duration: 0.18 },
  },
} as const;

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
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
                <h2 className="text-xl font-medium">Đăng nhập</h2>

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
                    Tài khoản
                  </label>
                  <InputField
                    name="username"
                    autoComplete="current-username"
                    registration={register("username", {
                      required: "Vui lòng nhập Tài khoản",
                    })}
                    error={errors?.username as FieldError}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-normal mb-2"
                  >
                    Mật khẩu
                  </label>
                  <InputField
                    name="password"
                    registration={register("password", {
                      required: "Vui lòng nhập Mật khẩu",
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
                      <span>Đang xử lý...</span>
                    </div>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>

                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Chưa có tài khoản?{" "}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Đăng ký ngay
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
