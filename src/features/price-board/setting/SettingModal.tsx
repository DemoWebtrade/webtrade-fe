import { Button } from "@/components/ui/Button";
import InputCheckbox from "@/components/ui/inputs/InputCheckbox";
import { backdropVariants, modalVariants } from "@/configs/modal";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectHeaderTableBaseConfig } from "@/store/modules/priceboard/selector";
import { setHeaderTableBaseConfig } from "@/store/modules/priceboard/slice";
import type { HeaderTableBaseConfig } from "@/store/modules/priceboard/types";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCw, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import {
  useForm,
  useWatch,
  type FieldValues,
  type UseFormRegister,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckboxGroup = ({
  items,
  reverse = false,
  indent = false,
  register,
}: {
  items: HeaderTableBaseConfig[];
  reverse?: boolean;
  indent?: boolean;
  register: UseFormRegister<FieldValues>;
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col gap-2 ${reverse ? "flex-col-reverse" : ""} ${
        indent ? "ml-5" : ""
      }`}
    >
      {items.map((item) => (
        <InputCheckbox
          key={item.field}
          name={item.field}
          label={t(item.label)}
          defaultChecked={!item.hide}
          registration={register(item.field)}
        />
      ))}
    </div>
  );
};

export default function SettingModal({ isOpen, onClose }: SettingModalProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const headerTableBaseConfig = useAppSelector(selectHeaderTableBaseConfig);

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    register,
    getValues,
    reset,
    control,
  } = useForm();

  const bidValue = useWatch({ control, name: "bid" });
  const matchedValue = useWatch({ control, name: "matched" });
  const askedValue = useWatch({ control, name: "asked" });
  const foreignValue = useWatch({ control, name: "foreign" });

  const filterByRange = (min: number, max: number) =>
    headerTableBaseConfig.filter(
      (item) => item.index >= min && item.index <= max,
    );

  useEffect(() => {
    if (!isOpen) return;

    const bidItems = filterByRange(5, 10);

    bidItems.forEach((item) => {
      setValue(item.field, bidValue);
    });
  }, [bidValue, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const matchedItems = filterByRange(11, 14);

    matchedItems.forEach((item) => {
      setValue(item.field, matchedValue);
    });
  }, [matchedValue, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const askedItems = filterByRange(15, 20);

    askedItems.forEach((item) => {
      setValue(item.field, askedValue);
    });
  }, [askedValue, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const foreignItems = filterByRange(24, Infinity);

    foreignItems.forEach((item) => {
      setValue(item.field, foreignValue);
    });
  }, [foreignValue, isOpen]);

  const handleClose = useCallback(() => {
    onClose();
    reset();
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  const handleSetValue = () => {
    const bidItems = filterByRange(5, 10);
    const matchedItems = filterByRange(11, 14);
    const askedItems = filterByRange(15, 20);
    const foreignItems = filterByRange(24, Infinity);

    const allBidVisibleItems = bidItems?.every((item) => !item.hide);

    if (allBidVisibleItems) {
      setValue("bid", true);
    }

    const allMatchedVisibleItems = matchedItems?.every((item) => !item.hide);

    if (allMatchedVisibleItems) {
      setValue("matched", true);
    }

    const allAskVisibleItems = askedItems?.every((item) => !item.hide);

    if (allAskVisibleItems) {
      setValue("asked", true);
    }

    const allForeignVisibleItems = foreignItems?.every((item) => !item.hide);

    if (allForeignVisibleItems) {
      setValue("foreign", true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleSetValue();
    }
  }, [isOpen]);

  const buildUpdatedConfig = (
    config: HeaderTableBaseConfig[],
    formValues: FieldValues,
  ) => {
    return config.map((item) => {
      return {
        ...item,
        hide: !formValues[item.field],
      };
    });
  };

  const handleReset = async () => {
    headerTableBaseConfig.forEach((item) => setValue(item.field, true));
    setValue("bid", true);
    setValue("matched", true);
    setValue("asked", true);
    setValue("foreign", true);
  };

  const onSubmit = async () => {
    const data = getValues();

    const updatedConfig = buildUpdatedConfig(headerTableBaseConfig, data);

    await new Promise((resolve) => setTimeout(resolve, 300));
    await dispatch(setHeaderTableBaseConfig(updatedConfig));
    handleClose();
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
          <div className="fixed inset-0 z-9999999 flex items-center justify-center">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-6 py-6 max-w-[90%] w-full md:w-180 rounded-lg shadow-2xl overflow-hidden border border-border bg-bg-primary"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6">
                <h2 className="text-xl font-medium">{t("display-options")}</h2>

                <div className="text-content-primary" onClick={handleClose}>
                  <X size={20} />
                </div>
              </div>

              <div className="w-full h-px bg-border"></div>

              <form
                className="flex flex-col gap-4 md:gap-6 md:px-6 px-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                  {/* Col 1 */}
                  <div className="flex flex-col gap-2">
                    <CheckboxGroup
                      items={filterByRange(0, 4)}
                      register={register}
                    />
                    <div className="flex flex-col gap-2">
                      <InputCheckbox
                        name="bid"
                        label={t("bid")}
                        registration={register("bid")}
                      />
                      <CheckboxGroup
                        items={filterByRange(5, 10)}
                        reverse
                        indent
                        register={register}
                      />
                    </div>
                  </div>

                  {/* Col 2 */}
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <InputCheckbox
                        name="matched"
                        label={t("matched")}
                        registration={register("matched")}
                      />
                      <CheckboxGroup
                        items={filterByRange(11, 14)}
                        indent
                        register={register}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <InputCheckbox
                        name="asked"
                        label={t("asked")}
                        registration={register("asked")}
                      />
                      <CheckboxGroup
                        items={filterByRange(15, 20)}
                        reverse
                        indent
                        register={register}
                      />
                    </div>
                  </div>

                  {/* Col 3 */}
                  <div className="flex flex-col gap-2">
                    <CheckboxGroup
                      items={filterByRange(21, 23)}
                      register={register}
                    />
                    <div className="flex flex-col gap-2">
                      <InputCheckbox
                        name="foreign"
                        label={t("foreign")}
                        registration={register("foreign")}
                      />
                      <CheckboxGroup
                        items={filterByRange(24, Infinity)}
                        reverse
                        indent
                        register={register}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-border" />

                <div className="flex flex-row items-center justify-center w-full gap-2 md:px-6">
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-1/3 md:w-40"
                    onClick={handleClose}
                  >
                    {t("button.close")}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-1/3 md:w-40 whitespace-nowrap"
                    onClick={handleReset}
                  >
                    <RotateCw size={16} className="md:mr-2 mr-1" />
                    {t("button.reset")}
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/3 md:w-40"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {t("button.save")}
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
