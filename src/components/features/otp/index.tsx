import { Button } from "@/components/ui/Button";
import InputFieldOtp from "@/components/ui/inputs/InputFieldOtp";
import { backdropVariants, modalVariants } from "@/configs";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

type OtpFormValues = { otp: string };

type OTPProps = {
  open: boolean;
  onClose: () => void;
  target?: string;
  length?: number;
  resendSeconds?: number;
  onVerify?: (otp: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
};

export default function OTP({ open, ...props }: OTPProps) {
  return <AnimatePresence>{open && <OTPContent {...props} />}</AnimatePresence>;
}

function OTPContent({
  onClose,
  target,
  length = 6,
  resendSeconds = 60,
  onVerify,
  onResend,
}: Omit<OTPProps, "open">) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<OtpFormValues>({ defaultValues: { otp: "" } });

  const [countdown, setCountdown] = useState(resendSeconds);
  const otpValue = useWatch({ control, name: "otp" });
  const isComplete = otpValue.length >= length;

  // Đếm ngược: setState nằm trong callback của interval nên hợp lệ
  useEffect(() => {
    const id = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Đóng bằng phím Esc
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const onSubmit = async (data: OtpFormValues) => {
    console.log("action otp", data.otp);
    await onVerify?.(data.otp);
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    await onResend?.();
    setCountdown(resendSeconds);
  };

  return (
    <>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-9999999 flex items-center justify-center">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="otp-title"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col items-center relative gap-6 py-6 max-w-[90%] w-full md:w-100 rounded-lg shadow-2xl overflow-hidden border border-border bg-bg-primary"
        >
          {/* Nút đóng */}
          <div
            className="text-content-primary absolute top-4 right-4 cursor-pointer"
            onClick={onClose}
          >
            <X size={20} />
          </div>

          {/* Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
            <ShieldCheck size={32} />
          </div>

          {/* Tiêu đề + mô tả */}
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 id="otp-title" className="text-xl font-semibold">
              Xác thực OTP
            </h2>
            <p className="text-sm opacity-70 leading-relaxed">
              Chúng tôi đã gửi mã gồm {length} chữ số
              {target ? (
                <>
                  {" "}
                  đến <span className="font-medium opacity-100">{target}</span>
                </>
              ) : null}
              .<br />
              Vui lòng nhập mã để tiếp tục.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 w-full flex flex-col items-center justify-center gap-6"
          >
            <InputFieldOtp
              registration={register("otp")}
              className="md:w-80 w-2/3! min-w-40"
            />

            <Button
              type="submit"
              disabled={!isComplete || isSubmitting}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              isLoading={isSubmitting}
            >
              {t("button.confirm")}
            </Button>
          </form>

          {/* Gửi lại mã */}
          <div className="flex items-center gap-1 text-sm">
            <span className="opacity-70">Chưa nhận được mã?</span>
            {countdown > 0 ? (
              <span className="font-medium tabular-nums opacity-80">
                Gửi lại sau {countdown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="font-medium text-purple-base hover:underline hover:text-purple-hover cursor-pointer transition-colors"
              >
                Gửi lại mã
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
