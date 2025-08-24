import React, { useState } from "react";
import useQuotes from "../hooks/useQuotes";
import QuoteTable from "../components/QuoteTable";
import OrderForm from "../components/OrderForm";

export default function Dashboard() {
  const quotes = useQuotes(["INFY", "TCS", "RELIANCE", "HDFCBANK", "SBIN"]);
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      {/* Stock Quotes Table */}
      <QuoteTable quotes={quotes} onSelectSymbol={setSelectedSymbol} />

      {/* Order Form */}
      <OrderForm symbols={Object.keys(quotes)} selectedSymbol={selectedSymbol} />
    </div>
  );
}
