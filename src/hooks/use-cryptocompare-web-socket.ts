/* eslint-disable react-hooks/exhaustive-deps */

import { useAtom } from "jotai";
import { useEffect, useState, useCallback } from "react";
import { tradesAtom } from "@/global-sate";

const DEFAULT_SUBSCRIPTIONS = ["0~Coinbase~BTC~USD"];
const URL = "wss://streamer.cryptocompare.com/v2?api_key=";
const API_KEY = import.meta.env.VITE_CRYPTOCOMPARE_API_KEY;

export const useCryptoCompareWebSocket = (
  subscriptions: string[] = DEFAULT_SUBSCRIPTIONS
) => {
  const [webSocket, setWebSocket] = useState<WebSocket | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);
  const [trades, setTrades] = useAtom(tradesAtom);

  const subscribe = useCallback(() => {
    if (webSocket) return;

    const sub = new WebSocket(URL + API_KEY);

    sub.onopen = function onStreamOpen() {
      console.log("WebSocket connected");
      setIsConnected(true);

      const subRequest = {
        action: "SubAdd",
        subs: subscriptions,
      };
      sub.send(JSON.stringify(subRequest));
    };

    sub.onmessage = function onStreamMessage(event) {
      const message = JSON.parse(event.data);

      if (message.TYPE !== "0") return

      const tradeExists = trades.some((trade) => trade.ID === message.ID);
      if (tradeExists) return

      setTrades((prevTrades) => [...prevTrades, message]);
    };

    sub.onclose = () => {
      console.log("WebSocket has been closed.");
      setIsConnected(false);
    };

    sub.onerror = function onStreamError(error) {
      console.error("WebSocket error: ", error);
    };

    setWebSocket(sub);
    return sub;
  }, [webSocket, subscriptions, setTrades]);

  const unsubscribe = useCallback(() => {
    if (webSocket) {
      webSocket.close(1000, "Client closed connection");
      setWebSocket(undefined);
      setIsConnected(false);
    }
  }, [webSocket]);

  useEffect(() => {
    const ws = subscribe();

    return () => {
      ws?.close(1000, "Component unmounted");
    };
  }, []);

  return {
    isConnected,
    trades,
    subscribe,
    unsubscribe,
  };
};
