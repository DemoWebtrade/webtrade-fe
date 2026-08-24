import { useTheme } from "@/hooks/useTheme";
import ReactECharts from "echarts-for-react";
import { useEffect, useMemo, useRef, useState } from "react";

const rawData = [
  { value: 1048, name: "ACB" },
  { value: 735, name: "MBS" },
  { value: 580, name: "VRE" },
  { value: 484, name: "CII" },
  { value: 300, name: "HDB" },
];

const colors = [
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
  const chartRef = useRef<ReactECharts>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();

  const [selected, setSelected] = useState<Record<string, boolean>>(
    Object.fromEntries(rawData.map((d) => [d.name, true])),
  );

  const textColor = theme === "dark" ? "#f9fafb" : "#1f2937";

  const borderColor = theme === "dark" ? "#161a22" : "#ffffff";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const resizeChart = () => {
      chartRef.current?.getEchartsInstance()?.resize();
    };

    const ro = new ResizeObserver(() => {
      resizeChart();
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const option = useMemo(
    () => ({
      baseOption: {
        color: colors,
        textStyle: { fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14 },
        legend: { show: false },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["85%", "62%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 4,
              borderColor: borderColor,
              borderWidth: 2,
            },
            label: { show: false, position: "center" },
            emphasis: {
              label: {
                show: true,
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: 16,
                fontWeight: "bold",
                color: textColor,
              },
            },
            labelLine: { show: false },
            data: rawData,
          },
        ],
      },
      media: [
        {
          query: { maxWidth: 200 },
          option: {
            tooltip: { textStyle: { fontSize: 12 } },
            series: [
              {
                center: ["50%", "45%"],
                radius: ["68%", "45%"],
                emphasis: { label: { fontSize: 14 } },
              },
            ],
          },
        },
        {
          query: { minWidth: 201, maxWidth: 480 },
          option: {
            tooltip: { textStyle: { fontSize: 12 } },
            series: [
              {
                center: ["48%", "48%"],
                radius: ["82%", "60%"],
                emphasis: { label: { fontSize: 14 } },
              },
            ],
          },
        },
        {
          query: { minWidth: 481, maxWidth: 768 },
          option: {
            tooltip: { textStyle: { fontSize: 12 } },
            series: [
              {
                center: ["48%", "48%"],
                radius: ["85%", "62%"],
                emphasis: { label: { fontSize: 14 } },
              },
            ],
          },
        },
        {
          query: { minWidth: 769 },
          option: {
            tooltip: { textStyle: { fontSize: 14 } },
            series: [
              {
                center: ["46%", "50%"],
                radius: ["85%", "62%"],
                emphasis: { label: { fontSize: 16 } },
              },
            ],
          },
        },
      ],
    }),
    [borderColor, textColor],
  );

  const handleToggle = (name: string) => {
    const instance = chartRef.current?.getEchartsInstance();
    instance?.dispatchAction({ type: "legendToggleSelect", name });
    setSelected((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleHover = (name: string, enter: boolean) => {
    const instance = chartRef.current?.getEchartsInstance();
    instance?.dispatchAction({
      type: enter ? "highlight" : "downplay",
      seriesIndex: 0,
      name,
    });
  };

  return (
    <div ref={containerRef} className="flex w-full h-full min-w-0 min-h-0">
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

      <div className="max-h-full overflow-y-auto flex flex-col gap-2 px-2 py-2 w-28 md:w-30 shrink-0">
        {rawData.map((item, idx) => (
          <div
            key={item.name}
            onClick={() => handleToggle(item.name)}
            onMouseEnter={() => handleHover(item.name, true)}
            onMouseLeave={() => handleHover(item.name, false)}
            style={{
              opacity: selected[item.name] ? 1 : 0.4,
              fontFamily: "Hanken Grotesk, sans-serif",
              color: textColor,
            }}
            className="flex flex-row items-center md:gap-1.5 gap-0.75 cursor-pointer text-sm"
          >
            <span
              style={{
                background: colors[idx % colors.length],
              }}
              className="w-2.5 h-2.5 rounded-xs shrink-0"
            />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {item.name}
            </span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap ml-auto">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
