import { atom } from "jotai";
import { Trade } from "@/types";

const MONITOR_PAGE_TRADES_COUNT_LIMIT = 500;

export const isConnectedAtom = atom(false);

export const tradesAtom = atom<Trade[]>([]);

export const monitorPageTradesAtom = atom<Trade[]>((get) => {
  const trades = get(tradesAtom);
  return trades.slice(trades.length - MONITOR_PAGE_TRADES_COUNT_LIMIT);
});

export const alertsPageTradesAtom = atom<Trade[]>((get) => {
  const trades = get(tradesAtom);
  const nowInSeconds = Math.floor(Date.now() / 1000);

  // recent trades from the last 60 seconds
  return trades.filter((trade) => trade.TS >= nowInSeconds - 60);
});
