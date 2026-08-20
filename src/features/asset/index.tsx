import SprinnerLoader from "@/components/features/skeletons/SprinnerLoader";
import Portfolio from "@/components/portfolio/Portfolio";
import { Suspense } from "react";
import AssetTotal from "./AssetTotal";

export default function Asset() {
  return (
    <div className="w-full h-full flex flex-col gap-1 md:gap-2 p-1 lg:p-2 md:p-4">
      <div className="order flex flex-col md:flex-row gap-1 md:gap-2 w-full h-auto md:h-1/3">
        <div className="order-1 bg-bg-secondary rounded-md overflow-y-auto flex flex-col border border-border flex-1 min-h-35 md:h-full md:min-h-0">
          <AssetTotal />
        </div>
        <div className="order-3 md:order-2 bg-bg-secondary rounded-md overflow-y-auto flex flex-col border border-border flex-1 min-h-45 md:h-full md:min-h-0">
          <h1 className="md:text-base text-sm font-medium px-2 py-1">
            Phân bổ danh mục
          </h1>
        </div>
        <div className="order-2 md:order-3 bg-bg-secondary rounded-md overflow-y-auto flex flex-col border border-border flex-2 min-h-40 md:h-full md:min-h-0">
          <h1 className="md:text-base text-sm font-medium px-2 py-1">
            Hiệu suất đầu tư
          </h1>
        </div>
      </div>
      <div className="bg-bg-secondary rounded-md overflow-y-auto flex flex-col border border-border flex-1 md:h-2/3 min-h-40">
        <h1 className="md:text-base text-sm font-medium px-2 py-1">
          Danh mục đầu tư
        </h1>
        <div className="flex-1 min-h-0">
          <Suspense fallback={<SprinnerLoader />}>
            <Portfolio />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
