import React, { useState, useEffect } from "react";

export default function OrderForm({ symbols = [], selectedSymbol }) {
  const [symbol, setSymbol] = useState(symbols[0] || "");
  const [side, setSide] = useState("BUY");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); 
  // idle | success | error

  useEffect(() => {
    if (selectedSymbol) setSymbol(selectedSymbol);
  }, [selectedSymbol]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const order = {
      userId: 1, 
      symbol,
      side,
      qty: quantity,
      type: "MARKET",
      limitPrice: null,
    };

    try {
      const res = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Order placement failed");

      const data = await res.json();
      console.log("✅ Order placed:", data);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded space-y-4">
      <h3 className="text-lg font-semibold">Place Order</h3>

      {/* Symbol dropdown */}
      <select
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      >
        {symbols.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Buy / Sell options */}
      <div className="flex gap-4">
        <label>
          <input
            type="radio"
            value="BUY"
            checked={side === "BUY"}
            onChange={(e) => setSide(e.target.value)}
          />{" "}
          Buy
        </label>
        <label>
          <input
            type="radio"
            value="SELL"
            checked={side === "SELL"}
            onChange={(e) => setSide(e.target.value)}
          />{" "}
          Sell
        </label>
      </div>

      {/* Quantity */}
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border px-3 py-2 rounded w-full"
      />

            {/* Smart Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-1.5 rounded text-white text-sm flex items-center justify-center transition
            ${
              status === "success"
                ? "bg-green-500"
                : status === "error"
                ? "bg-red-500"
                : "bg-blue-500 hover:bg-blue-600"
            }
            ${loading ? "opacity-70 cursor-not-allowed" : ""}
          `}
        >
          {loading ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
          ) : status === "success" ? (
            "✅ Success"
          ) : status === "error" ? (
            "❌ Failed"
          ) : (
            "Submit"
          )}
        </button>
      </div>

    </form>
  );
}
