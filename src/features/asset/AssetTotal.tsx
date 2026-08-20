import { Button } from "@/components/ui/Button";
import { ArrowLeftRight, Eye, EyeOff, Wallet } from "lucide-react";
import { useState } from "react";

export default function AssetTotal() {
  const [isShowAsset, setIsShowAsset] = useState(false);

  return (
    <div className="w-full h-full flex flex-col px-2 py-1.5">
      <div className="flex flex-row items-center justify-between gap-0.5 pb-0.5 md:pb-1 mb-1 md:mb-1.5 border-b border-border">
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-base font-medium py-0.5 md:py-1">
              Tổng tài sản
            </h1>

            <button
              onClick={() => setIsShowAsset((pre) => !pre)}
              aria-label={isShowAsset ? "Ẩn số dư" : "Hiện số dư"}
              className="text-content-tertiary hover:text-content-primary transition-colors"
            >
              {isShowAsset ? (
                <Eye className="size-3 md:size-4" />
              ) : (
                <EyeOff className="size-3 md:size-4" />
              )}
            </button>
          </div>
          <span className="text-lg md:text-xl font-semibold text-content-primary">
            {isShowAsset ? "1,000 VND" : "*********"}
          </span>
        </div>

        <div className="flex flex-col gap-1 md:gap-2">
          <Button variant="success" className="px-1! py-1!">
            <Wallet className="size-3" />
            Nộp tiền
          </Button>
          <Button variant="secondary" className="px-1! py-1!">
            <ArrowLeftRight className="size-3" />
            Chuyển tiền
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-1 md:gap-1.5">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-sm text-content-tertiary">Tài sản ròng</h1>
          <span className="text-sm font-medium text-content-primary">
            {isShowAsset ? "1,000 VND" : "******"}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-sm text-content-tertiary">Giá trị danh mục</h1>
          <span className="text-sm font-medium text-content-primary">
            {isShowAsset ? "1,000 VND" : "******"}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-sm text-content-tertiary">Tiền</h1>
          <span className="text-sm font-medium text-content-primary">
            {isShowAsset ? "1,000 VND" : "******"}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-sm text-content-tertiary">Lãi/ Lỗ</h1>
          <span className="text-sm font-medium text-content-primary">
            {isShowAsset ? "1,000 VND" : "******"}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-sm text-content-tertiary">Nợ tạm tính</h1>
          <span className="text-sm font-medium text-red-500">
            {isShowAsset ? "-1,000 VND" : "******"}
          </span>
        </div>
      </div>
    </div>
  );
}
