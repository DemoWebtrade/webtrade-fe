import { memo, useEffect, useRef } from "react";

function TradingViewChart() {
  const container = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!container.current || isLoaded.current) return;
    isLoaded.current = true;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "allow_symbol_change": true,
          "calendar": false,
          "details": false,
          "hide_side_toolbar": true,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "D",
          "locale": "en",
          "save_image": true,
          "style": "1",
          "symbol": "NASDAQ:AAPL",
          "theme": "dark",
          "timezone": "Etc/UTC",
          "backgroundColor": "#0F0F0F",
          "watchlist": [],
          "withdateranges": false,
          "compareSymbols": [],
          "support_host": "https://www.tradingview.com",
          "studies": [],
          "autosize": true
        }`;

    container.current.appendChild(script);
  }, []);

  return (
    <div
      className="tradingview-widget-container w-full h-full"
      ref={container}
    ></div>
  );
}

export default memo(TradingViewChart);
