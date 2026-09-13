import { Button } from "@/components/ui/Button";
import InputPrice from "@/components/ui/inputs/InputPrice";
import InputVolume from "@/components/ui/inputs/InputVolume";
import {
  backdropVariants,
  LIST_STOCKS,
  MARKET_TYPE,
  modalVariants,
  PRICE_TYPE,
} from "@/configs";
import { StringToInt } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface EditOrderForm {
  price: number;
  quantity: number;
}

export default function EditOrderModal({
  open,
  order,
  loading,
  onClose,
  onSubmit,
}: {
  open: boolean;
  order: {
    _id: string;
    symbol: string;
    price: number;
    quantity: number;
  } | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: EditOrderForm) => void;
}) {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<EditOrderForm>();

  const stockInfor = LIST_STOCKS.find((s) => s.code === order?.symbol);

  const price = useWatch({
    control,
    name: "price",
  });

  useEffect(() => {
    if (order) {
      reset({ price: order.price / 1000, quantity: order.quantity });
    }
  }, [order, reset]);

  const handleValidateVolume = (volume: string | number | null) => {
    if (!volume) {
      return "validate.volume-required";
    }

    const numericVolume = StringToInt(volume);

    if (numericVolume < 100 && typeof price !== "number") {
      return "validate.volume-incorrect-pl";
    }

    if (
      !numericVolume ||
      numericVolume <= 0 ||
      (numericVolume > 100 && numericVolume % 100 !== 0)
    ) {
      return "validate.volume-incorrect";
    }

    if (
      numericVolume > 500_000 &&
      stockInfor?.exchange?.toUpperCase() === "HOSE"
    ) {
      return "validate.volume-incorrect";
    }
  };

  const handleValidatePrice = (price: number | string | null) => {
    if (!price) {
      return "validate.price-required";
    }

    // validate theo sàn
    const market = stockInfor?.exchange?.toUpperCase();

    if (typeof price === "string" && price && PRICE_TYPE?.includes(price)) {
      if (market && !MARKET_TYPE?.[market]?.includes(price)) {
        return market === "HOSE"
          ? "validate.price-incorrect-hose"
          : market === "HNX"
            ? "validate.price-incorrect-hnx"
            : market === "UPCOM"
              ? "validate.price-incorrect-upcom"
              : "validate.price-incorrect";
      }

      return;
    }

    const numericPrice = StringToInt(price);

    if (!numericPrice || numericPrice <= 0) {
      return "validate.price-incorrect";
    }

    const priceInVnd = Math.round(numericPrice * 1000);
    const step = numericPrice < 10 ? 10 : numericPrice < 50 ? 50 : 100;

    // if (stockDetail && priceInVnd > stockDetail?.ceil) {
    //   return "validate.price-incorrect-ceil";
    // }

    // if (stockDetail && priceInVnd < stockDetail?.floor) {
    //   return "validate.price-incorrect-floor";
    // }

    if (market === "HOSE") {
      if (Math.round(priceInVnd % step) !== 0) {
        return "validate.price-incorrect";
      }
    }

    if (market === "HNX") {
      if (Math.round(priceInVnd % 100) !== 0) {
        return "validate.price-incorrect";
      }
    }
  };

  const handleOnSubmit = handleSubmit((data) => {
    const { price, quantity } = data;

    onSubmit({
      price: price * 1000,
      quantity: quantity,
    });
  });

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
            onClick={onClose}
          />
          <div className="fixed inset-0 z-9999999 flex items-center justify-center">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-6 py-6 max-w-[90%] w-full md:w-120 rounded-lg shadow-2xl overflow-hidden border border-border bg-bg-primary"
            >
              <div className="sticky top-0 flex items-baseline justify-between px-6">
                <h2 className="text-xl font-medium">Sửa lệnh {order.symbol}</h2>
                <button
                  type="button"
                  aria-label="Đóng"
                  onClick={onClose}
                  className="w-6 h-6 flex items-center justify-center text-content-tertiary hover:text-content-primary cursor-pointer"
                >
                  <X
                    className="w-4 h-4 text-content-primary"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div className="w-full h-px bg-border"></div>

              <form className="flex flex-col gap-4 md:gap-6 px-6">
                <div className="flex flex-row items-start">
                  <span className="font-medium w-2/5 md:w-1/3 text-xs sm:text-sm text-content-tertiary">
                    {t("input.order-volume")}
                  </span>
                  <div className="flex-1">
                    <InputVolume
                      name="quantity"
                      control={control}
                      error={errors.quantity}
                      className="px-1! py-0.5!"
                      rules={{
                        validate: (value) => handleValidateVolume(value),
                      }}
                    />
                  </div>
                </div>
                {/* Giá */}
                <div className="flex flex-row items-start">
                  <span className="font-medium w-2/5 md:w-1/3 text-xs sm:text-sm text-content-tertiary">
                    {t("input.order-price")}
                  </span>
                  <div className="flex-1">
                    <InputPrice
                      name="price"
                      control={control}
                      error={errors.price}
                      className="px-1! py-0.5!"
                      symbol={order.symbol}
                      rules={{
                        validate: (value) => handleValidatePrice(value),
                      }}
                    />
                  </div>
                </div>

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
                    onClick={handleOnSubmit}
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
