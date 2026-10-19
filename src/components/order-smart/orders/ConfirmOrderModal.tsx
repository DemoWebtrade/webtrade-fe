import { Button } from "@/components/ui/Button";
import {
  backdropVariants,
  modalVariants,
  ORDER_TYPE_LABEL,
  PRICE_MULTIPLIER,
  PRICE_TYPE,
} from "@/configs";
import type { OrderSide, OrderType } from "@/store/modules/order/types";
import type { StockListItem } from "@/types";
import { formatVolPrice, numberFormat } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export type ConfirmOrder = {
  account: string;
  side: OrderSide;
  orderType: OrderType;
  quantity: number;
  price: number;
  stockInfor: StockListItem;
};

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div className="text-sm text-content-tertiary shrink-0">{label}</div>
      <div className="text-sm font-medium text-content-primary text-right">
        {children}
      </div>
    </div>
  );
}

export default function ConfirmOrderModal({
  open,
  order,
  loading,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  order: ConfirmOrder | null;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation();

  const isBuy = order?.side === "buy";
  const hasPrice = order ? !PRICE_TYPE.includes(order.orderType) : false;
  const orderValue = order
    ? +order.quantity * +order.price * PRICE_MULTIPLIER
    : 0;

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
            onClick={loading ? undefined : onCancel}
          />

          <div className="fixed inset-0 z-9999999 flex items-center justify-center pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirm-order-title"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pointer-events-auto flex flex-col gap-5 p-6 max-w-[90%] w-full md:w-120 rounded-lg shadow-2xl overflow-hidden border border-border bg-bg-primary"
            >
              {/* Tiêu đề */}
              <div className="flex items-center justify-between gap-3">
                <h2 id="confirm-order-title" className="text-xl font-medium">
                  Xác nhận đặt lệnh
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isBuy
                      ? "bg-bg-green text-green-base"
                      : "bg-bg-red text-red-base"
                  }`}
                >
                  {isBuy ? "Mua" : "Bán"}
                </span>
              </div>

              {/* Mã + sàn */}
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-3xl font-semibold ${
                    isBuy ? "text-green-base" : "text-red-base"
                  }`}
                >
                  {order.stockInfor.symbol}
                </span>
                <span className="text-sm text-content-tertiary">
                  {order.stockInfor.exchange.toLocaleUpperCase()} -{" "}
                  {order.stockInfor.clientName}
                </span>
              </div>

              <div className="w-full h-px bg-border" />

              {/* Chi tiết lệnh */}
              <div className="flex flex-col divide-y divide-border">
                <Row label="Tài khoản">{order.account}</Row>
                <Row label="Loại lệnh">{ORDER_TYPE_LABEL[order.orderType]}</Row>
                <Row label="Khối lượng">{formatVolPrice(+order.quantity)}</Row>
                <Row label="Giá đặt">
                  {hasPrice ? order.price : order.orderType}
                </Row>
              </div>

              {/* Giá trị lệnh */}
              {hasPrice && (
                <div className="flex items-center justify-between gap-4 rounded-md bg-bg-secondary px-4 py-3">
                  <span className="text-sm text-content-tertiary">
                    Giá trị lệnh
                  </span>
                  <span className="text-lg font-semibold text-content-primary">
                    {numberFormat(orderValue, 0, "")} {t("vnd")}
                  </span>
                </div>
              )}

              {/* Hành động */}
              <div className="flex flex-row gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={loading}
                  className="w-1/2"
                >
                  {t("button.cancel")}
                </Button>
                <Button
                  type="button"
                  className="w-1/2"
                  isLoading={loading}
                  disabled={loading}
                  onClick={onConfirm}
                >
                  {isBuy ? "Đặt lệnh mua" : "Đặt lệnh bán"}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
