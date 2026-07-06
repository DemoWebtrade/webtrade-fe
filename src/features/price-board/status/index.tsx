import { selectLatency } from "@/store/modules/socket/selector";
import { Minus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Status({ marketStatus }: { marketStatus: string }) {
  const { t } = useTranslation();

  const statusConfig: Record<
    string,
    {
      label: string;
      dotColor: string;
    }
  > = {
    connected: {
      label: t("data-updated"),
      dotColor: "bg-green-500",
    },
    reconnecting: {
      label: t("reconnecting"),
      dotColor: "bg-yellow-500",
    },
    disconnected: {
      label: t("disconnected"),
      dotColor: "bg-red-active",
    },
    connect_error: {
      label: t("connection-error"),
      dotColor: "bg-red-active",
    },
    failed: {
      label: t("unable-connect"),
      dotColor: "bg-red-active",
    },
  };

  const latency = useSelector(selectLatency);
  const config = statusConfig[marketStatus] ?? statusConfig.disconnected;
  const isConnected = marketStatus === "connected";

  const latencyColor =
    latency === null
      ? "text-content-tertiary"
      : latency < 100
        ? "text-green-500"
        : latency < 300
          ? "text-yellow-500"
          : "text-red-active";

  return (
    <div className="h-full w-full flex flex-row items-center justify-between px-1 py-0.5 md:px-4 rounded-b-xl border-x border-b border-border">
      <div className="text-[8px] md:text-[10px] flex flex-row gap-0.5 md:gap-1 items-center justify-center text-content-primary">
        <span>{t("price-table", { price: "1,000" })}</span>
        <span>{t("volume-table", { volume: "1" })}</span>
        <span>{t("value-table", { value: "1,000,000" })} </span>
        <span className="text-content-tertiary hidden md:block">
          {t("copy-right")}
        </span>
      </div>

      <div className="flex flex-row gap-1 md:gap-2 items-center">
        {/* Wifi icon + trạng thái */}
        <div className="flex flex-row items-center gap-1 md:gap-1.5">
          <span className="relative flex size-1.5">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full ${config.dotColor} opacity-75`}
            />
            <span
              className={`relative inline-flex size-1.5 rounded-full ${config.dotColor}`}
            />
          </span>
          <span className="text-content-tertiary text-xs">{config.label}</span>
        </div>

        <div className="h-2 w-px bg-border max-[550px]:hidden" />

        {/* Độ trễ */}
        <div className="flex flex-row items-center gap-0.5 md:gap-1.5">
          <span className={`text-xs ${latencyColor}`}>
            {isConnected && latency !== null ? (
              `${latency}ms`
            ) : (
              <Minus size={12} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
