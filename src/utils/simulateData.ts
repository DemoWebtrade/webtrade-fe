import type { PriceVolumeChart } from "@/types";

export function generatePriceVolumeChartWithSession({
  startPrice = 253,
  date = "2026-01-15",
  intervalSec = 300, // 5 phút
  volatility = 0.6,
}: {
  startPrice?: number;
  date?: string; // YYYY-MM-DD
  intervalSec?: number;
  volatility?: number;
}): PriceVolumeChart {
  const o: number[] = [];
  const h: number[] = [];
  const l: number[] = [];
  const c: number[] = [];
  const v: number[] = [];
  const t: number[] = [];

  let lastClose = startPrice;

  const toUnix = (time: string) =>
    Math.floor(new Date(`${date}T${time}`).getTime() / 1000);

  const sessions = [
    { start: "09:00:00", end: "11:59:59" },
    { start: "13:00:00", end: "15:00:00" },
  ];

  for (const session of sessions) {
    let current = toUnix(session.start);
    const end = toUnix(session.end);

    while (current <= end) {
      const open = lastClose;

      const change = (Math.random() - 0.5) * volatility;
      const close = +(open + change).toFixed(2);

      const high = +Math.max(
        open,
        close,
        open + Math.random() * volatility,
      ).toFixed(2);
      const low = +Math.min(
        open,
        close,
        open - Math.random() * volatility,
      ).toFixed(2);

      const volume = Math.floor(800_000 + Math.random() * 2_000_000);

      o.push(open);
      h.push(high);
      l.push(low);
      c.push(close);
      v.push(volume);
      t.push(current);

      lastClose = close;
      current += intervalSec;
    }
  }

  return {
    o,
    h,
    l,
    c,
    v,
    t,
    s: "ok",
  };
}
