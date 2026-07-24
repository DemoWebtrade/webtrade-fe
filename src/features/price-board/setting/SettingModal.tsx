import { Button } from "@/components/ui/Button";
import InputCheckbox from "@/components/ui/inputs/InputCheckbox";
import { backdropVariants, modalVariants } from "@/configs/modal";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectHeaderTableBaseConfig } from "@/store/modules/priceboard/selector";
import { setHeaderTableBaseConfig } from "@/store/modules/priceboard/slice";
import type { HeaderTableBaseConfig } from "@/store/modules/priceboard/types";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCw, X } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import {
  useForm,
  type ChangeHandler,
  type FieldValues,
  type UseFormRegister,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Config hoá 4 nhóm cha-con thay vì lặp code 4 lần
const GROUPS = [
  { name: "bid", min: 5, max: 10, reverse: true },
  { name: "matched", min: 11, max: 14, reverse: false },
  { name: "asked", min: 15, max: 20, reverse: true },
  { name: "foreign", min: 24, max: Infinity, reverse: true },
] as const;

type GroupName = (typeof GROUPS)[number]["name"];

const CheckboxGroup = ({
  items,
  reverse = false,
  indent = false,
  register,
  groupName,
  onChildChange,
}: {
  items: HeaderTableBaseConfig[];
  reverse?: boolean;
  indent?: boolean;
  register: UseFormRegister<FieldValues>;
  groupName?: GroupName;
  onChildChange?: (groupName: GroupName) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col gap-2 ${reverse ? "flex-col-reverse" : ""} ${
        indent ? "ml-5" : ""
      }`}
    >
      {items.map((item) => {
        const reg = register(item.field);
        const onChange: ChangeHandler = async (e) => {
          const result = await reg.onChange(e);
          if (groupName && onChildChange) {
            onChildChange(groupName);
          }
          return result;
        };

        return (
          <InputCheckbox
            key={item.field}
            name={item.field}
            label={t(item.label)}
            defaultChecked={!item.hide}
            registration={{ ...reg, onChange }}
          />
        );
      })}
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
  } = useForm();

  const filterByRange = useCallback(
    (min: number, max: number) =>
      headerTableBaseConfig.filter(
        (item) => item.index >= min && item.index <= max,
      ),
    [headerTableBaseConfig],
  );

  const groupItemsMap = useMemo(() => {
    return GROUPS.reduce<Record<GroupName, HeaderTableBaseConfig[]>>(
      (acc, g) => {
        acc[g.name] = filterByRange(g.min, g.max);
        return acc;
      },
      {} as Record<GroupName, HeaderTableBaseConfig[]>,
    );
  }, [filterByRange]);

  const handleParentChange = useCallback(
    (groupName: GroupName, value: boolean) => {
      groupItemsMap[groupName]?.forEach((item) => {
        setValue(item.field, value);
      });
    },
    [groupItemsMap, setValue],
  );

  const handleChildChange = useCallback(
    (groupName: GroupName) => {
      const items = groupItemsMap[groupName];
      if (!items) return;
      const allChecked = items.every((item) => getValues(item.field));
      setValue(groupName, allChecked);
    },
    [groupItemsMap, getValues, setValue],
  );

  const loadConfigIntoForm = useCallback(() => {
    headerTableBaseConfig.forEach((item) => {
      setValue(item.field, !item.hide);
    });

    GROUPS.forEach((g) => {
      const items = groupItemsMap[g.name];
      const allVisible = items?.every((item) => !item.hide);
      setValue(g.name, !!allVisible);
    });
  }, [headerTableBaseConfig, groupItemsMap, setValue]);

  useEffect(() => {
    if (isOpen) {
      loadConfigIntoForm();
    }
  }, [isOpen, loadConfigIntoForm]);

  const handleClose = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  const buildUpdatedConfig = (
    config: HeaderTableBaseConfig[],
    formValues: FieldValues,
  ) => {
    return config.map((item) => ({
      ...item,
      hide: !formValues[item.field],
    }));
  };

  const handleReset = () => {
    headerTableBaseConfig.forEach((item) => setValue(item.field, true));
    GROUPS.forEach((g) => setValue(g.name, true));
  };

  const onSubmit = async () => {
    const data = getValues();
    const updatedConfig = buildUpdatedConfig(headerTableBaseConfig, data);

    await new Promise((resolve) => setTimeout(resolve, 300));
    await dispatch(setHeaderTableBaseConfig(updatedConfig));
    handleClose();
  };

  const registerParent = (groupName: GroupName) => {
    const reg = register(groupName);
    const onChange: ChangeHandler = async (e) => {
      const result = await reg.onChange(e);
      handleParentChange(groupName, e.target.checked);
      return result;
    };
    return { ...reg, onChange };
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
                        registration={registerParent("bid")}
                      />
                      <CheckboxGroup
                        items={groupItemsMap.bid}
                        reverse
                        indent
                        register={register}
                        groupName="bid"
                        onChildChange={handleChildChange}
                      />
                    </div>
                  </div>

                  {/* Col 2 */}
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <InputCheckbox
                        name="matched"
                        label={t("matched")}
                        registration={registerParent("matched")}
                      />
                      <CheckboxGroup
                        items={groupItemsMap.matched}
                        indent
                        register={register}
                        groupName="matched"
                        onChildChange={handleChildChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <InputCheckbox
                        name="asked"
                        label={t("asked")}
                        registration={registerParent("asked")}
                      />
                      <CheckboxGroup
                        items={groupItemsMap.asked}
                        reverse
                        indent
                        register={register}
                        groupName="asked"
                        onChildChange={handleChildChange}
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
                        registration={registerParent("foreign")}
                      />
                      <CheckboxGroup
                        items={groupItemsMap.foreign}
                        reverse
                        indent
                        register={register}
                        groupName="foreign"
                        onChildChange={handleChildChange}
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
