import { Button } from "@/components/ui/Button";
import { backdropVariants, modalVariants } from "@/configs";
import { formatPrice, formatVolPrice } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ConfirmCancelOrderModal({
  open,
  order,
  loading,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  order: {
    symbol: string;
    side: "buy" | "sell";
    quantity: number;
    price: number;
  } | null;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {open && order && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onCancel}
          />

          <div className="fixed inset-0 z-9999999 flex items-center justify-center">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-6 p-6 max-w-[90%] w-full md:w-120 rounded-lg shadow-2xl overflow-hidden border border-border bg-bg-primary"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-bg-red flex items-center justify-center">
                  <AlertTriangle
                    className="w-5 h-5 text-red-base"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="text-xl font-medium">Hủy lệnh này?</h2>
                <p className="text-content-tertiary text-sm leading-relaxed">
                  Lệnh {order.side === "buy" ? "mua" : "bán"}{" "}
                  <span className="text-content-primary font-medium">
                    {order.symbol}
                  </span>{" "}
                  khối lượng {formatVolPrice(+order.quantity)} tại giá{" "}
                  {formatPrice(+order.price)} sẽ bị hủy.
                </p>
              </div>
              <div className="w-full h-px bg-border"></div>

              <div className="flex flex-row gap-2 col-span-1 px-6">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onCancel}
                  className="w-1/2"
                >
                  {t("button.cancel")}
                </Button>{" "}
                <Button
                  type="submit"
                  className="w-1/2"
                  isLoading={loading}
                  disabled={loading}
                  onClick={onConfirm}
                >
                  {loading ? "Đang xử lý..." : "Hủy lệnh"}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
