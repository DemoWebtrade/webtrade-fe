import { useTheme } from "@/hooks/useTheme";
import { useAppSelector } from "@/store/hook";
import { selectAssetSummary } from "@/store/modules/asset/selector";
import { numberFormat } from "@/utils";
import ReactECharts from "echarts-for-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const COLORS = [
  "#5070dd",
  "#b6d634",
  "#505372",
  "#ff994d",
  "#0ca8df",
  "#ffd10a",
  "#fb628b",
  "#785db0",
  "#3fbe95",
];

export default function PortfolioAllocationChart() {
  const { t } = useTranslation();

  const { theme } = useTheme();
  const assetSummary = useAppSelector(selectAssetSummary);

  const chartRef = useRef<ReactECharts>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Chỉ lưu những item bị user tắt (deselected)
  const [deselected, setDeselected] = useState<Set<string>>(new Set());

  const textColor = theme === "dark" ? "#f9fafb" : "#1f2937";
  const borderColor = theme === "dark" ? "#161a22" : "#ffffff";

  const rawData = useMemo(() => {
    if (!assetSummary?.portfolio?.length) return [];

    return assetSummary.portfolio.map((item) => ({
      name: item.symbol,
      value: item.marketValue,
    }));
  }, [assetSummary]);

  // Resize observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const resizeChart = () => {
      chartRef.current?.getEchartsInstance()?.resize();
    };

    const ro = new ResizeObserver(resizeChart);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const option = useMemo(
    () => ({
      color: COLORS,
      textStyle: {
        fontFamily: "Hanken Grotesk, sans-serif",
        fontSize: 14,
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {d}%",
        textStyle: { fontSize: 13 },
      },
      legend: { show: false },
      series: [
        {
          name: "Portfolio",
          type: "pie",
          radius: ["62%", "85%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 4,
            borderColor,
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: 16,
              fontWeight: "bold",
              color: textColor,
            },
            scale: true,
            scaleSize: 6,
          },
          labelLine: { show: false },
          data: rawData,
        },
      ],
      media: [
        {
          query: { maxWidth: 200 },
          option: {
            series: [
              {
                center: ["50%", "45%"],
                radius: ["45%", "68%"],
                emphasis: { label: { fontSize: 14 } },
              },
            ],
          },
        },
        {
          query: { minWidth: 201, maxWidth: 480 },
          option: {
            series: [
              {
                center: ["48%", "48%"],
                radius: ["60%", "82%"],
                emphasis: { label: { fontSize: 14 } },
              },
            ],
          },
        },
        {
          query: { minWidth: 481, maxWidth: 768 },
          option: {
            series: [
              {
                center: ["48%", "48%"],
                radius: ["62%", "85%"],
                emphasis: { label: { fontSize: 14 } },
              },
            ],
          },
        },
        {
          query: { minWidth: 769 },
          option: {
            series: [
              {
                center: ["46%", "50%"],
                radius: ["62%", "85%"],
                emphasis: { label: { fontSize: 16 } },
              },
            ],
          },
        },
      ],
    }),
    [rawData, borderColor, textColor],
  );

  const handleToggle = (name: string) => {
    const instance = chartRef.current?.getEchartsInstance();
    instance?.dispatchAction({ type: "legendToggleSelect", name });

    setDeselected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name); // bật lại
      } else {
        next.add(name); // tắt
      }
      return next;
    });
  };

  const handleHover = (name: string, enter: boolean) => {
    const instance = chartRef.current?.getEchartsInstance();
    instance?.dispatchAction({
      type: enter ? "highlight" : "downplay",
      seriesIndex: 0,
      name,
    });
  };

  if (rawData.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full text-sm text-gray-500">
        No data
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex w-full h-full min-w-0 min-h-0">
      {/* Chart */}
      <div className="flex-1 min-w-0 min-h-0">
        <ReactECharts
          ref={chartRef}
          option={option}
          style={{ height: "100%", width: "100%" }}
          opts={{ renderer: "canvas" }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>

      {/* Custom Legend */}
      <div className="max-h-full overflow-y-auto flex flex-col gap-2 px-2 py-2 sm:w-38 md:w-42 lg:w-56 shrink-0">
        {rawData.map((item, idx) => {
          const isActive = !deselected.has(item.name);

          return (
            <div
              key={item.name}
              onClick={() => handleToggle(item.name)}
              onMouseEnter={() => handleHover(item.name, true)}
              onMouseLeave={() => handleHover(item.name, false)}
              style={{
                opacity: isActive ? 1 : 0.4,
                fontFamily: "Hanken Grotesk, sans-serif",
                color: textColor,
              }}
              className="flex flex-row items-center md:gap-1.5 gap-0.75 cursor-pointer select-none"
            >
              <span
                style={{ background: COLORS[idx % COLORS.length] }}
                className="w-2.5 h-2.5 rounded-xs shrink-0"
              />
              <span className="overflow-hidden whitespace-nowrap md:text-sm text-xs">
                {item.name}
              </span>
              <span className="overflow-hidden whitespace-nowrap ml-auto tabular-nums md:text-sm text-xs">
                {numberFormat(item.value) + " " + t("vnd")}
              </span>
            </div>
          );
        })}
        <div className="flex flex-row items-center justify-between gap-1 mt-auto border-t border-border pt-2 sticky bottom-0">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            Tổng
          </span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap ml-auto tabular-nums md:text-sm text-xs">
            {numberFormat(rawData.reduce((pre, cur) => pre + cur.value, 0)) +
              " " +
              t("vnd")}
          </span>
        </div>
      </div>
    </div>
  );
}
