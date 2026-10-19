import { Button } from "@/components/ui/Button";
import InputFieldOtp from "@/components/ui/inputs/InputFieldOtp";
import { backdropVariants, modalVariants } from "@/configs";
import { useAppSelector } from "@/store/hook";
import { selectProfile } from "@/store/modules/auth/selector";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

type OtpFormValues = { otp: string };

type OTPProps = {
  open: boolean;
  onClose: () => void;
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
  length = 6,
  resendSeconds = 60,
  onVerify,
}: Omit<OTPProps, "open">) {
  const { t } = useTranslation();

  const profile = useAppSelector(selectProfile);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<OtpFormValues>({ defaultValues: { otp: "" } });

  const [countdown, setCountdown] = useState(resendSeconds);
  const otpValue = useWatch({ control, name: "otp" });
  const isComplete = otpValue.length >= length;

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
    await handleGetOTP();
    setCountdown(resendSeconds);
  };

  const handleGetOTP = () => {
    console.log("GET OTP");
  };

  return (
    <>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 bg-black/10 backdrop-blur-sm z-9999999"
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
          className="flex flex-col items-center relative gap-6 py-6 max-w-[80%] w-full md:w-100 rounded-lg shadow-2xl overflow-hidden border border-border bg-bg-primary"
        >
          {/* Nút đóng */}
          <div
            className="text-content-primary absolute top-4 right-4 cursor-pointer"
            onClick={onClose}
          >
            <X size={20} />
          </div>

          {/* Icon */}
          <div className="flex md:size-16 size-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
            <ShieldCheck className="md:size-10 size-7" />
          </div>

          {/* Tiêu đề + mô tả */}
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 id="otp-title" className="text-xl font-semibold">
              Xác thực OTP
            </h2>
            <p className="text-sm opacity-70 leading-relaxed">
              Vui lòng kiểm tra email
              {profile ? (
                <>
                  {" "}
                  <span className="font-medium opacity-100">
                    {t(profile.email)}
                  </span>
                </>
              ) : null}{" "}
              <br />
              và nhập mã OTP để tiếp tục.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 md:gap-6 px-6 w-full items-center justify-center"
          >
            <InputFieldOtp
              registration={register("otp")}
              className="md:w-80 w-2/3! min-w-40"
            />

            <div className="w-full h-px bg-border"></div>

            <div className="flex flex-row gap-2 col-span-1 px-6 w-full">
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
                disabled={!isComplete || isSubmitting}
                isLoading={isSubmitting}
              >
                {t("button.confirm")}
              </Button>
            </div>
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
