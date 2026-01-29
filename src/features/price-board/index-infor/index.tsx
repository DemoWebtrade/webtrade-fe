import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ChartIndex from "./ChartIndex";

export default function IndexInfor() {
  const [openIndex] = React.useState(() =>
    Number((Math.random() * 2 + 253).toFixed(2)),
  );

  return (
    <div className="w-full h-full">
      <Swiper
        navigation={true}
        spaceBetween={4}
        modules={[Navigation]}
        breakpoints={{
          0: { slidesPerView: 1 },
          500: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1740: { slidesPerView: 4 },
        }}
        zoom={false}
        className="h-full w-full"
      >
        {/* VN30 */}
        <SwiperSlide>
          <div className="w-full h-full flex flex-col bg-bg-secondary rounded-md pb-1">
            <div className="flex flex-row items-center justify-between px-2 py-2 md:px-1 md:pt-1 md:pb-3">
              <div className="flex flex-col items-start">
                <h1 className="text-xs md:text-sm font-medium">VN-INDEX</h1>
                <div className="flex flex-row gap-2 md:gap-4">
                  <span className="md:text-xs text-[10px] font-normal text-green-500 flex flex-row items-center gap-1">
                    <TrendingUp className="md:size-4 size-3" /> 143
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-yellow-500">
                    - 65
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-red-500 flex flex-row items-center gap-1">
                    <TrendingDown className="md:size-4 size-3" /> 174
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="text-xs md:text-sm font-medium text-green-500">
                  1,879.13
                </h1>
                <span className="md:text-xs text-[10px] font-normal text-green-500">
                  14.33 ( 0.77% )
                </span>
              </div>
            </div>
            <div className="flex-1">
              <ChartIndex openIndex={openIndex} />
            </div>
          </div>
        </SwiperSlide>

        {/* VN-INDEX */}
        <SwiperSlide>
          <div className="w-full h-full flex flex-col bg-bg-secondary rounded-md pb-1">
            <div className="flex flex-row items-center justify-between px-1 pt-1 pb-1 md:px-1 md:pt-1 md:pb-3">
              <div className="flex flex-col items-start">
                <h1 className="text-xs md:text-sm font-medium">VN-INDEX</h1>
                <div className="flex flex-row gap-2 md:gap-4">
                  <span className="md:text-xs text-[10px] font-normal text-green-500 flex flex-row items-center gap-1">
                    <TrendingUp className="md:size-4 size-3" /> 143
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-yellow-500">
                    - 65
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-red-500 flex flex-row items-center gap-1">
                    <TrendingDown className="md:size-4 size-3" /> 174
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="text-xs md:text-sm font-medium text-green-500">
                  1,879.13
                </h1>
                <span className="md:text-xs text-[10px] font-normal text-green-500">
                  14.33 ( 0.77% )
                </span>
              </div>
            </div>
            <div className="flex-1">
              <ChartIndex openIndex={openIndex} />
            </div>
          </div>
        </SwiperSlide>

        {/* HNX-INDEX */}
        <SwiperSlide>
          <div className="w-full h-full flex flex-col bg-bg-secondary rounded-md pb-1">
            <div className="flex flex-row items-center justify-between px-1 pt-1 pb-1 md:px-1 md:pt-1 md:pb-3">
              <div className="flex flex-col items-start">
                <h1 className="text-xs md:text-sm font-medium">HNX-INDEX</h1>
                <div className="flex flex-row gap-2 md:gap-4">
                  <span className="md:text-xs text-[10px] font-normal text-green-500 flex flex-row items-center gap-1">
                    <TrendingUp className="md:size-4 size-3" /> 143
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-yellow-500">
                    - 65
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-red-500 flex flex-row items-center gap-1">
                    <TrendingDown className="md:size-4 size-3" /> 174
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="text-xs md:text-sm font-medium text-green-500">
                  1,879.13
                </h1>
                <span className="md:text-xs text-[10px] font-normal text-green-500">
                  14.33 ( 0.77% )
                </span>
              </div>
            </div>
            <div className="flex-1">
              <ChartIndex openIndex={openIndex} />
            </div>
          </div>
        </SwiperSlide>

        {/* HNX-INDEX */}
        <SwiperSlide>
          <div className="w-full h-full flex flex-col bg-bg-secondary rounded-md pb-1">
            <div className="flex flex-row items-center justify-between px-1 pt-1 pb-1 md:px-1 md:pt-1 md:pb-3">
              <div className="flex flex-col items-start">
                <h1 className="text-xs md:text-sm font-medium">HNX-INDEX</h1>
                <div className="flex flex-row gap-2 md:gap-4">
                  <span className="md:text-xs text-[10px] font-normal text-green-500 flex flex-row items-center gap-1">
                    <TrendingUp className="md:size-4 size-3" /> 143
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-yellow-500">
                    - 65
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-red-500 flex flex-row items-center gap-1">
                    <TrendingDown className="md:size-4 size-3" /> 174
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="text-xs md:text-sm font-medium text-green-500">
                  1,879.13
                </h1>
                <span className="md:text-xs text-[10px] font-normal text-green-500">
                  14.33 ( 0.77% )
                </span>
              </div>
            </div>
            <div className="flex-1">
              <ChartIndex openIndex={openIndex} />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
