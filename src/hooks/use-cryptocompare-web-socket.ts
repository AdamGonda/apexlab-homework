/* eslint-disable react-hooks/exhaustive-deps */

import { useAtom } from "jotai";
import { useEffect, useState, useCallback } from "react";
import { tradesAtom } from "@/global-sate";

const DEFAULT_SUBSCRIPTIONS = ["0~Coinbase~BTC~USD"];
const URL = "wss://streamer.cryptocompare.com/v2?api_key=";
const API_KEY = import.meta.env.VITE_CRYPTOCOMPARE_API_KEY;
const TRADE_COUNT_LIMIT = 2000;

export const useCryptoCompareWebSocket = (
  subscriptions: string[] = DEFAULT_SUBSCRIPTIONS
) => {
  const [webSocket, setWebSocket] = useState<WebSocket | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);
  const [, setTrades] = useAtom(tradesAtom);

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

      if (message.TYPE !== "0") return;

      setTrades((prev) => {
        const tradeExists = prev.some((trade) => trade.ID === message.ID);
        if (tradeExists) {
          return prev;
        }

        if (prev.length > TRADE_COUNT_LIMIT) {
          const oldestTrade = prev[0];
          return prev.filter((trade) => trade.ID !== oldestTrade.ID);
        } else {
          return [...prev, message];
        }
      });
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
  }, [webSocket, subscriptions]);

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
    subscribe,
    unsubscribe,
  };
};
