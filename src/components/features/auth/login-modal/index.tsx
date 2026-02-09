import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ── Variants ────────────────────────────────────────────────────────────────

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

// ── Types ───────────────────────────────────────────────────────────────────

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: LoginFormData) => Promise<void> | void;
}

// ── Component ───────────────────────────────────────────────────────────────

export default function LoginModal({
  isOpen,
  onClose,
  onSubmit,
}: LoginModalProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  // Auto focus email khi modal mở
  useEffect(() => {
    if (isOpen && emailRef.current) {
      emailRef.current.focus();
    }
  }, [isOpen]);

  // Đóng modal bằng phím Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Nếu có onSubmit từ parent → gọi hàm đó
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Mock API call (thay bằng logic thật của bạn)
        await new Promise((resolve) => setTimeout(resolve, 1400));
        console.log("Login attempt:", formData);
        // Có thể thêm toast, redirect, set auth state...
      }

      // Uncomment nếu muốn tự động đóng sau khi thành công
      // onClose();
    } catch (error) {
      console.error("Login error:", error);
      // Có thể show error message ở đây
    } finally {
      setIsSubmitting(false);
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
            onClick={onClose}
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

                <div className="text-content-primary" onClick={onClose}>
                  <X size={20} />
                </div>
              </div>

              <div className="w-full h-px bg-border"></div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-normal mb-2"
                  >
                    Email
                  </label>
                  <input
                    ref={emailRef}
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    className="w-full px-3 py-[10px] rounded bg-bg-secondary border border-outline-base text-sm text-content-tertiary outline-none transition"
                    placeholder="example@gmail.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-normal mb-2"
                  >
                    Mật khẩu
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                    className="w-full px-3 py-[10px] rounded bg-bg-secondary border border-outline-base text-sm text-content-tertiary outline-none transition"
                    placeholder="••••••••"
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
