import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getBeneficiariesThunk } from "@/store/modules/auth/api";
import { selectLoadingBeneficiaries } from "@/store/modules/auth/selector";
import { getBankLogo } from "@/utils";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function BenAccount() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isLoadingBeneficiaries = useAppSelector(selectLoadingBeneficiaries);

  useEffect(() => {
    dispatch(getBeneficiariesThunk());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2 md:gap-3 md:mt-3 mt-1">
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="text-base p-2 md:p-3 bg-purple-base/20 flex items-center justify-between">
          <span>{t("user.account-lk")}</span>
          <div className="font-medium text-green-500 hover:text-green-hover">
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
        <div className="px-4">
          <div className="flex flex-col gap-4 p-4 rounded-2xl bg-bg-purple">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-4 items-center">
                <img
                  src={getBankLogo("MBB")}
                  alt="logo"
                  className="w-9 h-9 rounded-full"
                />
                <span className="text-sm">Ngân hàng TMCP Quân đội (MBB)</span>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-8">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-content-tertiary">
                    Số tài khoản
                  </span>
                  <span className="font-medium text-sm">0365218120</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-content-tertiary">Họ tên</span>
                  <span className="font-medium text-sm">LÊ HỒNG CHIẾN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
