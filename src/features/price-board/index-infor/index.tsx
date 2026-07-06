import { generatePriceVolumeChartWithSession } from "@/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import React, { lazy, Suspense, useMemo } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ChartIndex = lazy(() => import("./ChartIndex"));

export default function IndexInfor() {
  const [openIndex] = React.useState(() =>
    Number((Math.random() * 2 + 1814.09).toFixed(2)),
  );
  const [openIndex1] = React.useState(() =>
    Number((Math.random() * 2 + 2016.47).toFixed(2)),
  );
  const [openIndex2] = React.useState(() =>
    Number((Math.random() * 2 + 560.72).toFixed(2)),
  );
  const [openIndex3] = React.useState(() =>
    Number((Math.random() * 2 + 256.48).toFixed(2)),
  );

  const data = useMemo(
    () =>
      generatePriceVolumeChartWithSession({
        startPrice: 1814.09,
        date: "2026-01-15",
        intervalSec: 60, // 5 phút
      }) as {
        o: number[];
        h: number[];
        l: number[];
        c: number[];
        v: number[];
        t: number[];
        s: "ok";
      },
    [],
  );

  const data1 = useMemo(
    () =>
      generatePriceVolumeChartWithSession({
        startPrice: 2016.47,
        date: "2026-01-15",
        intervalSec: 60, // 5 phút
      }) as {
        o: number[];
        h: number[];
        l: number[];
        c: number[];
        v: number[];
        t: number[];
        s: "ok";
      },
    [],
  );

  const data2 = useMemo(
    () =>
      generatePriceVolumeChartWithSession({
        startPrice: 560.72,
        date: "2026-01-15",
        intervalSec: 60, // 5 phút
      }) as {
        o: number[];
        h: number[];
        l: number[];
        c: number[];
        v: number[];
        t: number[];
        s: "ok";
      },
    [],
  );

  const data3 = useMemo(
    () =>
      generatePriceVolumeChartWithSession({
        startPrice: 256.48,
        date: "2026-01-15",
        intervalSec: 60, // 5 phút
      }) as {
        o: number[];
        h: number[];
        l: number[];
        c: number[];
        v: number[];
        t: number[];
        s: "ok";
      },
    [],
  );

  return (
    <div className="w-full h-full">
      <Swiper
        navigation={true}
        spaceBetween={10}
        modules={[Navigation]}
        breakpoints={{
          0: { slidesPerView: 1 },
          550: { slidesPerView: 2 },
          840: { slidesPerView: 3 },
          1065: { slidesPerView: 3 },
          1140: { slidesPerView: 4 },
        }}
        zoom={false}
        allowTouchMove={false}
        className="h-40 w-full box-border!"
      >
        {/* VN30 */}
        <SwiperSlide>
          <div className="w-full h-full flex flex-col bg-bg-secondary rounded-xl border border-border">
            <div className="flex flex-row items-start justify-between md:pt-1 md:pb-3 p-3">
              <div className="flex flex-col items-start">
                <h1 className="text-base font-bold">VN30-INDEX</h1>
                <div className="flex flex-row gap-2 md:gap-4">
                  <span className="md:text-xs text-[10px] font-normal text-green-base flex flex-row items-center gap-1">
                    <TrendingUp className="md:size-4 size-3" /> 143
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-yellow-base">
                    - 65
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-red-base flex flex-row items-center gap-1">
                    <TrendingDown className="md:size-4 size-3" /> 174
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="text-lg font-semibold text-green-base">
                  1,879.13
                </h1>
                <div className="text-sm flex flex-row items-center gap-1 font-normal text-green-base">
                  <span>14.33</span>
                  <span>+0.77%</span>
                </div>
              </div>
            </div>
            <div className="h-15 px-3">
              <Suspense fallback={<div>Loading...</div>}>
                <ChartIndex openIndex={openIndex} data={data} />
              </Suspense>
            </div>
            <div className="flex-1 min-h-0 flex flex-row items-center justify-between px-3 mt-auto">
              <span className="text-sm flex flex-row gap-1 items-center">
                610,754,645
                <span className="text-xs text-content-tertiary">CP</span>
              </span>
              <span className="text-sm flex flex-row gap-1 items-center">
                15,656.662
                <span className="text-xs text-content-tertiary">Tỷ</span>
              </span>
            </div>
          </div>
        </SwiperSlide>

        {/* VN-INDEX */}
        <SwiperSlide>
          <div className="w-full h-full flex flex-col bg-bg-secondary rounded-xl border border-border">
            <div className="flex flex-row items-start justify-between md:pt-1 md:pb-3 p-3">
              <div className="flex flex-col items-start">
                <h1 className="text-base font-bold">VN-INDEX</h1>
                <div className="flex flex-row gap-2 md:gap-4">
                  <span className="md:text-xs text-[10px] font-normal text-green-base flex flex-row items-center gap-1">
                    <TrendingUp className="md:size-4 size-3" /> 143
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-yellow-base">
                    - 65
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-red-base flex flex-row items-center gap-1">
                    <TrendingDown className="md:size-4 size-3" /> 174
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="text-lg font-semibold text-green-base">
                  1,879.13
                </h1>
                <div className="text-sm flex flex-row items-center gap-1 font-normal text-green-base">
                  <span>14.33</span>
                  <span>+0.77%</span>
                </div>
              </div>
            </div>
            <div className="h-15 px-3">
              <Suspense fallback={<div>Loading...</div>}>
                <ChartIndex openIndex={openIndex1} data={data1} />
              </Suspense>
            </div>
            <div className="flex-1 min-h-0 flex flex-row items-center justify-between px-3 mt-auto">
              <span className="text-sm flex flex-row gap-1 items-center">
                610,754,645
                <span className="text-xs text-content-tertiary">CP</span>
              </span>
              <span className="text-sm flex flex-row gap-1 items-center">
                15,656.662
                <span className="text-xs text-content-tertiary">Tỷ</span>
              </span>
            </div>
          </div>
        </SwiperSlide>

        {/* HNX-INDEX */}
        <SwiperSlide>
          <div className="w-full h-full flex flex-col bg-bg-secondary rounded-xl border border-border">
            <div className="flex flex-row items-start justify-between md:pt-1 md:pb-3 p-3">
              <div className="flex flex-col items-start">
                <h1 className="text-base font-bold">HNX-INDEX</h1>
                <div className="flex flex-row gap-2 md:gap-4">
                  <span className="md:text-xs text-[10px] font-normal text-green-base flex flex-row items-center gap-1">
                    <TrendingUp className="md:size-4 size-3" /> 143
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-yellow-base">
                    - 65
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-red-base flex flex-row items-center gap-1">
                    <TrendingDown className="md:size-4 size-3" /> 174
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="text-lg font-semibold text-green-base">
                  1,879.13
                </h1>
                <div className="text-sm flex flex-row items-center gap-1 font-normal text-green-base">
                  <span>14.33</span>
                  <span>+0.77%</span>
                </div>
              </div>
            </div>
            <div className="h-15 px-3">
              <Suspense fallback={<div>Loading...</div>}>
                <ChartIndex openIndex={openIndex2} data={data2} />
              </Suspense>
            </div>
            <div className="flex-1 min-h-0 flex flex-row items-center justify-between px-3 mt-auto">
              <span className="text-sm flex flex-row gap-1 items-center">
                610,754,645
                <span className="text-xs text-content-tertiary">CP</span>
              </span>
              <span className="text-sm flex flex-row gap-1 items-center">
                15,656.662
                <span className="text-xs text-content-tertiary">Tỷ</span>
              </span>
            </div>
          </div>
        </SwiperSlide>

        {/* UPCOM-INDEX */}
        <SwiperSlide>
          <div className="w-full h-full flex flex-col bg-bg-secondary rounded-xl border border-border">
            <div className="flex flex-row items-start justify-between md:pt-1 md:pb-3 p-3">
              <div className="flex flex-col items-start">
                <h1 className="text-base font-bold">UPCOM-INDEX</h1>
                <div className="flex flex-row gap-2 md:gap-4">
                  <span className="md:text-xs text-[10px] font-normal text-green-base flex flex-row items-center gap-1">
                    <TrendingUp className="md:size-4 size-3" /> 143
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-yellow-base">
                    - 65
                  </span>
                  <span className="md:text-xs text-[10px] font-normal text-red-base flex flex-row items-center gap-1">
                    <TrendingDown className="md:size-4 size-3" /> 174
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="text-lg font-semibold text-green-base">
                  1,879.13
                </h1>
                <div className="text-sm flex flex-row items-center gap-1 font-normal text-green-base">
                  <span>14.33</span>
                  <span>+0.77%</span>
                </div>
              </div>
            </div>
            <div className="h-15 px-3">
              <Suspense fallback={<div>Loading...</div>}>
                <ChartIndex openIndex={openIndex3} data={data3} />
              </Suspense>
            </div>
            <div className="flex-1 min-h-0 flex flex-row items-center justify-between px-3 mt-auto">
              <span className="text-sm flex flex-row gap-1 items-center">
                610,754,645
                <span className="text-xs text-content-tertiary">CP</span>
              </span>
              <span className="text-sm flex flex-row gap-1 items-center">
                15,656.662
                <span className="text-xs text-content-tertiary">Tỷ</span>
              </span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
