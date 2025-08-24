import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function LiveChart({ symbol, history, socketData, onClose }) {
  const [chartData, setChartData] = useState([]);

  // Initialize chartData from history when component mounts or symbol changes
  useEffect(() => {
    setChartData(history.slice(-50).map(d => ({ price: Number(d.price), ts: d.ts })));
  }, [history, symbol]);

  // Append live data when socketData updates
  useEffect(() => {
    if (!socketData || socketData.symbol !== symbol || socketData.last == null) return;

    setChartData(prev => {
      const newPoint = { price: Number(socketData.last), ts: socketData.ts };
      const prevHistory = prev.slice(-49); // keep last 49 + new = 50 points
      return [...prevHistory, newPoint];
    });
  }, [socketData, symbol]);

  // Determine line color dynamically
  const getLineColor = () => {
    if (chartData.length < 2) return "#16a34a";
    return chartData[chartData.length - 1].price >= chartData[chartData.length - 2].price
      ? "#16a34a"
      : "#dc2626";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4 w-4/5 max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">{symbol} Live Chart</h2>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="ts"
                tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
              />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip labelFormatter={(ts) => new Date(ts).toLocaleTimeString()} />
              <Line
                type="monotone"
                dataKey="price"
                stroke={getLineColor()}
                dot={true}
                strokeWidth={2}
                isAnimationActive={true}
                animationDuration={200}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
