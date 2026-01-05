
import React from 'react';

interface TradingTerminalProps {
  symbol: string;
}

const TradingTerminal: React.FC<TradingTerminalProps> = ({ symbol }) => {
  // Construct the TradingView Widget URL for the Advanced Chart
  // This approach is much more reliable in React than script injection for dynamic symbol switching.
  const baseUrl = "https://s.tradingview.com/widgetembed/";
  const params = new URLSearchParams({
    symbol: symbol,
    interval: "5",
    timezone: "Asia/Kolkata",
    theme: "dark",
    style: "1",
    locale: "en",
    backgroundColor: "rgba(2, 6, 23, 1)",
    gridColor: "rgba(30, 41, 59, 0.4)",
    hide_top_toolbar: "0",
    hide_legend: "0",
    allow_symbol_change: "0",
    save_image: "0",
    container_id: "tradingview_chart"
  });

  const widgetUrl = `${baseUrl}?${params.toString()}`;

  return (
    <div className="h-full w-full bg-slate-950 overflow-hidden">
      <iframe
        id="tradingview_chart"
        name="tradingview_chart"
        src={widgetUrl}
        style={{ width: '100%', height: '100%', border: 'none' }}
        allowTransparency={true}
        scrolling="no"
        allowFullScreen={true}
        title={`TradingView Chart for ${symbol}`}
      ></iframe>
    </div>
  );
};

export default TradingTerminal;
