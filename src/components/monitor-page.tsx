import { monitorPageTradesAtom } from "@/global-sate";
import {  useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const MonitorPage = () => {
  const [trades] = useAtom(monitorPageTradesAtom);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [trades]);

  const formatNumber = (num: number) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div
      ref={scrollRef}
      className="bg-black p-4 h-screen overflow-y-scroll font-[Inconsolata]"
    >
      {trades.map((trade) => (
        <div key={trade.ID}>
          {`ID: ${trade.ID} | Price: $${formatNumber(
            trade.P
          )} | Quantity: ${formatNumber(trade.Q)} BTC | Total: $${formatNumber(
            trade.TOTAL
          )} | Time: ${new Date(trade.TS).toLocaleTimeString()}`}
        </div>
      ))}
    </div>
  );
};