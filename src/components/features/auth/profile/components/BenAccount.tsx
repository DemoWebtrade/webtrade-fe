import { useClickOutside } from "@/hooks/useClickOutside";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  deleteBeneficiariesThunk,
  getBeneficiariesThunk,
  setDefaultBeneficiariesThunk,
} from "@/store/modules/auth/api";
import {
  selectBeneficiaries,
  selectIsOpenAddAccountBen,
  selectLoadingBeneficiaries,
} from "@/store/modules/auth/selector";
import { setIsOpenAddAccountBen } from "@/store/modules/auth/slice";
import { getBankLogo } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import AddBenAccountModal from "./AddBenAccountModal";

export default function BenAccount() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isLoadingBeneficiaries = useAppSelector(selectLoadingBeneficiaries);
  const beneficiaries = useAppSelector(selectBeneficiaries);
  const isOpenAddAccountBen = useAppSelector(selectIsOpenAddAccountBen);

  const [isOpenSetting, setIsOpenSetting] = useState<string>();

  const settingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getBeneficiariesThunk());
  }, [dispatch]);

  const handleClickAdd = () => {
    dispatch(setIsOpenAddAccountBen(true));
  };

  const handleClickSetDefault = async (id: string) => {
    if (!id) return;

    try {
      await dispatch(setDefaultBeneficiariesThunk(id)).unwrap();
      toast.success(t("Đặt tài khoản mặc định thành công"));
      dispatch(getBeneficiariesThunk()).unwrap();
    } catch (error) {
      toast.error(error as string);
    }
    setIsOpenSetting(undefined);
  };

  const handleClickDelete = async (id: string) => {
    if (!id) return;

    try {
      await dispatch(deleteBeneficiariesThunk(id)).unwrap();
      toast.success(t("Xóa tài khoản liên kết thành công"));
      dispatch(getBeneficiariesThunk()).unwrap();
    } catch (error) {
      toast.error(error as string);
    }
    setIsOpenSetting(undefined);
  };

  useClickOutside(settingRef, () => {
    setIsOpenSetting(undefined);
  });

  return (
    <div className="flex flex-col gap-2 md:gap-3 md:mt-3 mt-1 h-full w-full">
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="text-base p-2 md:p-3 bg-purple-base/20 flex items-center justify-between">
          <span>{t("user.account-lk")}</span>
          <div
            className="font-medium text-green-500 hover:text-green-hover cursor-pointer"
            onClick={handleClickAdd}
          >
            {t("user.account-add")}
          </div>
        </div>
      </div>
      {/* list acc ben */}
      {isLoadingBeneficiaries ? (
        <>
          <div className="px-4">
            <div className="flex flex-col gap-4 p-4 rounded-2xl bg-bg-purple animate-pulse h-30"></div>
          </div>
          <div className="px-4">
            <div className="flex flex-col gap-4 p-4 rounded-2xl bg-bg-purple animate-pulse h-30"></div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto min-h-0">
          {beneficiaries &&
            !!beneficiaries?.length &&
            beneficiaries?.map((item) => (
              <div className="px-4" key={item._id}>
                <div className="flex flex-col gap-4 p-4 rounded-2xl bg-bg-purple">
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-4 items-center w-full">
                      <img
                        src={getBankLogo(item.bankCode)}
                        alt="logo"
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="text-sm">
                        {/* Ngân hàng TMCP Quân đội (MBB) */}
                        {item?.bankName}
                      </span>

                      <div className="ml-auto flex flex-row gap-1 items-center justify-center">
                        {item?.isDefault && (
                          <div className="rounded-2xl bg-purple-base/20 text-xs px-1 py-0.5 whitespace-nowrap">
                            Mac dinh
                          </div>
                        )}
                        <div
                          ref={settingRef}
                          className="relative"
                          onClick={() => setIsOpenSetting(item?._id)}
                        >
                          <div className="p-1 hover:bg-bg-button rounded-md cursor-pointer">
                            <EllipsisVertical size={16} />
                          </div>

                          <AnimatePresence>
                            {isOpenSetting === item?._id && (
                              <motion.div
                                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-[calc(100%+4px)] right-0 flex flex-col gap-1 bg-bg-tertiary rounded-md p-2 border border-border w-40"
                              >
                                {!item?.isDefault && (
                                  <div
                                    className="px-2 py-1 hover:bg-bg-button rounded-md cursor-pointer text-sm whitespace-nowrap"
                                    onClick={() =>
                                      handleClickSetDefault(item?._id)
                                    }
                                  >
                                    Đặt làm mặc định
                                  </div>
                                )}
                                <div
                                  className="px-2 py-1 hover:bg-bg-button rounded-md cursor-pointer text-sm whitespace-nowrap"
                                  onClick={() => handleClickDelete(item?._id)}
                                >
                                  Xóa tài khoản
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-8 w-full">
                      <div className="flex flex-col gap-1 w-1/2">
                        <span className="text-xs text-content-tertiary">
                          {t("user.account-code")}
                        </span>
                        <span className="font-medium text-sm">
                          {item?.accountNumber}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 w-1/2">
                        <span className="text-xs text-content-tertiary">
                          {t("user.name")}
                        </span>
                        <span className="font-medium text-sm">
                          {item?.fullName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <AddBenAccountModal
            isOpen={isOpenAddAccountBen}
            onClose={() => dispatch(setIsOpenAddAccountBen(false))}
          />
        </div>
      )}
    </div>
  );
}
