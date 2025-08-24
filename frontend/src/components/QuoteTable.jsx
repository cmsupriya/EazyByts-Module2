import React, { useState, useEffect, useMemo } from "react";
import LiveChart from "./LiveChart";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function QuoteTable({ quotes, socketData }) {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [quoteHistory, setQuoteHistory] = useState({});

  React.useEffect(() => {
    Object.values(quotes).forEach((q) => {
      const symbol = q.symbol;
      const price = Number(q.last);
      const ts = new Date(q.ts);

      setQuoteHistory((prev) => {
        const prevHistory = prev[symbol]?.slice(-20) || [];
        return {
          ...prev,
          [symbol]: [...prevHistory, { price, ts }],
        };
      });
    });
  }, [quotes]);

  // Trend color
  const getTrendColor = (symbol) => {
    const history = quoteHistory[symbol] || [];
    if (history.length < 2) return "#16a34a";
    return history[history.length - 1].price >= history[history.length - 2].price
      ? "#16a34a"
      : "#dc2626";
  };

  // Memoize history for performance
  const memoizedHistory = useMemo(() => quoteHistory, [quoteHistory]);

  return (
    <>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Symbol</th>
              <th className="border px-4 py-2 text-right">Price</th>
              <th className="border px-4 py-2 text-right">Time</th>
              <th className="border px-4 py-2 text-right">Trend</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(quotes).map((q) => (
              <tr
                key={q.symbol}
                onClick={() => setSelectedSymbol(q.symbol)}
                className="border-t hover:bg-blue-50 cursor-pointer"
              >
                <td className="px-4 py-2">{q.symbol}</td>
                <td
                  className={`px-4 py-2 text-right ${
                    q.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {q.last}
                </td>
                <td className="px-4 py-2 text-right">
                  {new Date(q.ts).toLocaleTimeString()}
                </td>
                <td className="px-4 py-2 text-right">
                  <div style={{ width: 120, height: 30, minHeight: 30 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={memoizedHistory[q.symbol] || []}>
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke={getTrendColor(q.symbol)}
                          dot={false}
                          strokeWidth={2}
                          isAnimationActive={true}
                          animationDuration={200}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSymbol && (
        <LiveChart
          symbol={selectedSymbol}
          history={quoteHistory[selectedSymbol] || []}
          socketData={socketData}
          onClose={() => setSelectedSymbol(null)}
        />
      )}
    </>
  );
}
