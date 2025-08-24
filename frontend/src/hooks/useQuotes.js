import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function useQuotes(symbols = ["INFY"]) {
  const [quotes, setQuotes] = useState({});

  useEffect(() => {
    const sock = new SockJS(import.meta.env.VITE_WS_URL || "http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => sock,
    });

    client.onConnect = () => {
      symbols.forEach((sym) => {
        client.subscribe(`/topic/quotes/${sym}`, (msg) => {
          const data = JSON.parse(msg.body);

          setQuotes((prev) => {
            const prevData = prev[data.symbol] || { history: [] };

            // keep last 20 points for sparkline
            const updatedHistory = [
              ...prevData.history,
              { price: data.last, ts: data.ts },
            ].slice(-20);

            return {
              ...prev,
              [data.symbol]: {
                ...data,
                history: updatedHistory,
              },
            };
          });
        });
      });
    };

    client.activate();
    return () => client.deactivate();
  }, [symbols]);

  return quotes;
}
