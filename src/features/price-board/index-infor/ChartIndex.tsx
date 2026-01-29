import { usePrevious } from "@/hooks/usePrevious";
import { useTheme } from "@/hooks/useTheme";
import {
  generatePriceVolumeChartWithSession,
  getCssVar,
  numberFormat,
} from "@/utils";
import {
  type BaselineData,
  BaselineSeries,
  createChart,
  type HistogramData,
  HistogramSeries,
  type IChartApi,
  type ISeriesApi,
  LastPriceAnimationMode,
  LineStyle,
  type MouseEventParams,
  type Time,
  type UTCTimestamp,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

interface Props {
  openIndex: number;
}

const data = generatePriceVolumeChartWithSession({
  startPrice: 253.32,
  date: "2026-01-15",
  intervalSec: 60, // 5 phút
});

const ChartIndex = (props: Props) => {
  const { openIndex } = props;

  const { theme } = useTheme();

  const preTheme = usePrevious(theme);

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const baselineSeriesRef = useRef<ISeriesApi<"Baseline"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  function updateTooltip(param: MouseEventParams<Time>) {
    if (!tooltipRef.current) return;

    const priceData = param.seriesData.get(
      baselineSeriesRef.current as ISeriesApi<"Baseline">,
    ) as BaselineData<Time> | undefined;

    const volumeData = param.seriesData.get(
      volumeSeriesRef.current as ISeriesApi<"Histogram">,
    ) as HistogramData<Time> | undefined;

    // Format thời gian theo múi giờ Việt Nam
    const timeStr = param.time
      ? new Date((param.time as number) * 1000).toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : "—";

    let content = `
    <div class="flex flex-row gap-2 ">
      <div>Time: ${timeStr}</div>
    `;

    if (priceData?.value !== undefined) {
      content += `<div>Price: ${numberFormat(priceData.value, 0, "-")}</div>`;
    }

    if (volumeData?.value !== undefined) {
      content += `<div>Volume: ${numberFormat(volumeData?.value, 0, "-")}</div>`;
    }

    content += `</div>`;

    tooltipRef.current.innerHTML = content;
  }

  const handleGetTooltip = () => {
    if (tooltipRef.current) {
      const lastIndex = data.t.length - 1;
      if (lastIndex >= 0) {
        const lastTime = data.t[lastIndex] as UTCTimestamp;
        const lastPrice = data.c[lastIndex];
        const lastVolume = data.v[lastIndex];

        const timeStr = new Date(lastTime * 1000).toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        tooltipRef.current.innerHTML = `<div class="flex flex-row gap-2">
  <div>Time: ${timeStr}</div>
  <div>Price: ${numberFormat(lastPrice, 0, "-")}</div>
  <div>Volume: ${numberFormat(lastVolume, 0, "-")}</div>
</div>`;
      } else {
        tooltipRef.current.innerHTML = "";
      }
    }
  };

  useEffect(() => {
    if (!chartContainerRef.current) {
      return;
    }

    // Tạo div cho tooltip
    const tooltip = document.createElement("div");
    tooltip.classList.add(
      ..."absolute text-xs px-1 z-[1000] left-0 md:-top-3 -top-2 cursor-none text-content-primary".split(
        " ",
      ),
    );

    chartContainerRef.current.appendChild(tooltip);
    tooltipRef.current = tooltip;

    // Tạo chart
    const chart: IChartApi = createChart(chartContainerRef.current, {
      autoSize: true,
      handleScale: {
        mouseWheel: false,
        pinch: false,
        axisPressedMouseMove: false,
      },
      rightPriceScale: {
        visible: false,
        borderVisible: false,
      },
      width: chartContainerRef.current.offsetWidth,
      height: chartContainerRef.current.offsetHeight,
      layout: {
        background: {
          color: getCssVar("--color-bg-secondary"),
        },
        textColor: getCssVar("--color-content-primary"),
        fontFamily: "Arial",
        fontSize: 10,
        attributionLogo: false,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      timeScale: {
        fixLeftEdge: true,
        fixRightEdge: true,
        barSpacing: 4,
        tickMarkFormatter: (time: UTCTimestamp) => {
          const date = new Date(time * 1000);
          return date.toLocaleTimeString("vi-VN", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
      localization: {
        timeFormatter: (time: UTCTimestamp) => {
          const date = new Date(time * 1000);
          const dateStr = date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          const timeStr = date.toLocaleTimeString("vi-VN", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          });
          return `${dateStr} ${timeStr}`;
        },
      },
    });

    // Lưu chart vào ref
    chartRef.current = chart;

    // Tạo series
    const baselineSeries = chart.addSeries(BaselineSeries, {
      baseValue: { type: "price", price: openIndex },
      topLineColor: "#34c85a",
      topFillColor1: "#34c85a1a",
      topFillColor2: "#34c85a1a",
      bottomLineColor: "#fd3b31",
      bottomFillColor1: "#ff00171a",
      bottomFillColor2: "#ff00171a",
      lineWidth: 1,
      lastPriceAnimation: LastPriceAnimationMode.Continuous,
      lastValueVisible: false,
      priceLineVisible: false,
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: "#0bdf39",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
      lastValueVisible: false,
      priceLineVisible: false,
    });
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.7,
        bottom: 0,
      },
    });

    // Lưu series vào refs
    baselineSeriesRef.current = baselineSeries;
    volumeSeriesRef.current = volumeSeries;

    // Tùy chỉnh tooltip
    chart.subscribeCrosshairMove((param) => {
      if (!tooltipRef.current) return;

      if (!param.point || !param.time || param.seriesData.size === 0) {
        handleGetTooltip();
      } else {
        // Hover bình thường
        updateTooltip(param);
      }
    });

    // Xử lý resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.resize(
          chartContainerRef.current.clientWidth,
          chartContainerRef.current.clientHeight,
        );
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (tooltipRef.current) {
        tooltipRef.current.remove();
      }
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (
      !chartRef.current ||
      !baselineSeriesRef.current ||
      !volumeSeriesRef.current ||
      data.c.length <= 0 ||
      data.t.length <= 0 ||
      data.v.length <= 0
    ) {
      return;
    }

    // Cập nhật baseValue cho baselineSeries
    baselineSeriesRef.current.applyOptions({
      baseValue: { type: "price", price: openIndex },
    });

    // Xóa price line cũ và tạo mới
    baselineSeriesRef.current.createPriceLine({
      price: openIndex,
      color: "#525151",
      lineWidth: 1,
      lineStyle: LineStyle.LargeDashed,
      axisLabelVisible: true,
    });

    // Chuẩn bị dữ liệu
    const chartData: { time: UTCTimestamp; value: number }[] = [];
    const barData: { time: UTCTimestamp; value: number; color: string }[] = [];

    for (const i in data.t) {
      const timestamp = data.t[i];
      const price = data.c[i];
      chartData.push({ time: timestamp as UTCTimestamp, value: price });
      barData.push({
        time: timestamp as UTCTimestamp,
        value: data.v[i],
        color: data.c[i] >= data.o[i] ? "#34c85a40" : "#ff001740",
      });
    }

    // Sắp xếp dữ liệu theo thời gian
    chartData.sort((a, b) => a.time - b.time);
    barData.sort((a, b) => a.time - b.time);

    // Cập nhật dữ liệu cho series
    baselineSeriesRef.current.setData(chartData);
    volumeSeriesRef.current.setData(barData);

    // Đặt phạm vi thời gian động
    const minTime = Math.min(...data.t) as Time;
    const maxTime = Math.max(...data.t) as Time;
    chartRef.current.timeScale().setVisibleRange({
      from: minTime,
      to: maxTime,
    });

    //Lấy tooltip lần đầu
    handleGetTooltip();
  }, [data, openIndex]);

  useEffect(() => {
    if (!chartRef.current) return;

    const currentBg = theme === "dark" ? "#161a22" : "#f9f9f9";
    const currentText = theme === "dark" ? "#ffffff" : "#000000";

    chartRef.current.applyOptions({
      layout: {
        background: {
          color: currentBg,
        },
        textColor: currentText,
      },
    });
  }, [theme]);

  return (
    <div
      ref={chartContainerRef}
      className="chart-container w-full h-full relative"
    />
  );
};

export default ChartIndex;
