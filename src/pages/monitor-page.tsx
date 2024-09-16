import { monitorPageTradesAtom } from "@/global-sate";
import { formatNumber } from "@/lib/utils";
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

  return (
    <div
      ref={scrollRef}
      className="bg-[#000212] p-4 h-screen overflow-y-scroll font-[Inconsolata] -mt-24 text-white"
    >
      {trades.map((trade) => (
        <div key={trade.ID}>
          {`ID: ${trade.ID} | Price: $${formatNumber(
            trade.P
          )} | Quantity: ${trade.Q} BTC | Total: $${formatNumber(
            trade.TOTAL
          )} | Time: ${new Date(trade.TS).toLocaleTimeString()}`}
        </div>
      ))}
    </div>
  );
};